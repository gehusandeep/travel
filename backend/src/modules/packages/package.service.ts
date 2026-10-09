import { NotFoundError } from '@/core/errors';
import type { Paginated } from '@/core/http/pagination';
import { systemClock, type Clock } from '@/core/time/clock';
import { getUpcomingDepartures } from './departure-availability';
import {
  fallbackCategoryRef,
  toPackageDetail,
  toPackageSummary,
  toUpcomingDeparture,
} from './package.mapper';
import type { CategoryDirectory, PackageFaqReader } from './package.ports';
import type { PackageFilter, PackageRepository } from './package.repository';
import type { PackageListQuery } from './package.schema';
import type {
  DepartureView,
  PackageDetail,
  PackageSummary,
  TourPackage,
  UpcomingDeparture,
} from './package.types';

/** Business rules for browsing the catalogue. Depends only on ports, never on storage details. */
export class PackageService {
  constructor(
    private readonly packages: PackageRepository,
    private readonly categories: CategoryDirectory,
    private readonly faqs: PackageFaqReader,
    private readonly clock: Clock = systemClock,
  ) {}

  async list(query: PackageListQuery): Promise<Paginated<PackageSummary>> {
    const categoryIds = query.category ? await this.resolveCategoryIds(query.category) : undefined;
    const { items, total } = await this.packages.list({
      filter: {
        q: query.q,
        categoryIds,
        region: query.region,
        tier: query.tier,
        mode: query.mode,
        minDays: query.minDays,
        maxDays: query.maxDays,
        maxPrice: query.maxPrice,
        featured: query.featured,
        slugs: query.slugs,
      },
      sort: query.sort,
      page: query.page,
      limit: query.limit,
    });
    return { items: await this.toSummaries(items), total };
  }

  async getBySlug(slug: string): Promise<PackageDetail> {
    const pkg = await this.findOrThrow(slug);
    const [breadcrumb, faqs] = await Promise.all([
      this.categories.getTrail(pkg.categoryId),
      this.faqs.findByPackageId(pkg.id),
    ]);
    const category = breadcrumb.at(-1) ?? fallbackCategoryRef(pkg.categoryId);
    return toPackageDetail(pkg, category, { breadcrumb, faqs, today: this.clock.today() });
  }

  /** Live seat availability for one package. */
  async getDepartures(slug: string): Promise<DepartureView[]> {
    const pkg = await this.findOrThrow(slug);
    return getUpcomingDepartures(pkg.departures, this.clock.today());
  }

  /** Same category first, then the same top-level category, then the same region. */
  async getRelated(slug: string, limit: number): Promise<PackageSummary[]> {
    const pkg = await this.findOrThrow(slug);
    const trail = await this.categories.getTrail(pkg.categoryId);
    const rootId = trail[0]?.id;

    const scopes: PackageFilter[] = [{ categoryIds: [pkg.categoryId] }];
    if (rootId && rootId !== pkg.categoryId) {
      scopes.push({ categoryIds: await this.categories.getSubtreeIds(rootId) });
    }
    scopes.push({ region: pkg.region });

    const related: TourPackage[] = [];
    for (const scope of scopes) {
      if (related.length >= limit) break;
      const { items } = await this.packages.list({
        filter: { ...scope, excludeIds: [pkg.id, ...related.map((item) => item.id)] },
        sort: 'recommended',
        page: 1,
        limit: limit - related.length,
      });
      related.push(...items);
    }
    return this.toSummaries(related);
  }

  /** Departure schedule across the catalogue (Trip To Temples style batch table). */
  async listUpcomingDepartures({
    limit,
    category,
  }: {
    limit: number;
    category?: string;
  }): Promise<UpcomingDeparture[]> {
    const categoryIds = category ? await this.resolveCategoryIds(category) : undefined;
    const [rows, refs] = await Promise.all([
      this.packages.findUpcomingDepartures({ from: this.clock.today(), limit, categoryIds }),
      this.categories.getRefMap(),
    ]);
    return rows.map((row) =>
      toUpcomingDeparture(row, refs.get(row.pkg.categoryId) ?? fallbackCategoryRef(row.pkg.categoryId)),
    );
  }

  private async resolveCategoryIds(slug: string): Promise<string[]> {
    const category = await this.categories.findRefBySlug(slug);
    if (!category) throw new NotFoundError('Category');
    return this.categories.getSubtreeIds(category.id);
  }

  private async findOrThrow(slug: string): Promise<TourPackage> {
    const pkg = await this.packages.findBySlug(slug);
    if (!pkg) throw new NotFoundError('Package');
    return pkg;
  }

  private async toSummaries(items: TourPackage[]): Promise<PackageSummary[]> {
    if (items.length === 0) return [];
    const refs = await this.categories.getRefMap();
    const today = this.clock.today();
    return items.map((pkg) =>
      toPackageSummary(pkg, refs.get(pkg.categoryId) ?? fallbackCategoryRef(pkg.categoryId), today),
    );
  }
}
