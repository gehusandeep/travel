import { paginateArray, type Paginated } from '@/core/http/pagination';
import { matchesSearch } from '@/core/utils/text';
import type {
  Departure,
  PackageRef,
  PackageRegion,
  PackageSort,
  PackageTier,
  TourPackage,
  TravelMode,
} from './package.types';

export interface PackageFilter {
  q?: string;
  categoryIds?: string[];
  region?: PackageRegion;
  tier?: PackageTier;
  mode?: TravelMode;
  minDays?: number;
  maxDays?: number;
  maxPrice?: number;
  featured?: boolean;
  slugs?: string[];
  excludeIds?: string[];
}

export interface PackageListOptions {
  filter: PackageFilter;
  sort: PackageSort;
  page: number;
  limit: number;
}

export interface DepartureRow {
  pkg: TourPackage;
  departure: Departure;
}

export interface UpcomingDepartureCriteria {
  /** YYYY-MM-DD; departures starting on or after this date. */
  from: string;
  limit: number;
  categoryIds?: string[];
}

/** Read-side persistence contract for the package catalogue. */
export interface PackageRepository {
  list(options: PackageListOptions): Promise<Paginated<TourPackage>>;
  findBySlug(slug: string): Promise<TourPackage | null>;
  findUpcomingDepartures(criteria: UpcomingDepartureCriteria): Promise<DepartureRow[]>;
}

const comparators: Record<PackageSort, (a: TourPackage, b: TourPackage) => number> = {
  recommended: (a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.sortOrder - b.sortOrder,
  'price-asc': (a, b) => a.priceFrom - b.priceFrom,
  'price-desc': (a, b) => b.priceFrom - a.priceFrom,
  'duration-asc': (a, b) => a.durationDays - b.durationDays || a.priceFrom - b.priceFrom,
  'duration-desc': (a, b) => b.durationDays - a.durationDays || a.priceFrom - b.priceFrom,
};

function matchesFilter(pkg: TourPackage, filter: PackageFilter): boolean {
  if (filter.categoryIds && !filter.categoryIds.includes(pkg.categoryId)) return false;
  if (filter.region && pkg.region !== filter.region) return false;
  if (filter.tier && pkg.tier !== filter.tier) return false;
  if (filter.mode && !pkg.travelModes.includes(filter.mode)) return false;
  if (filter.minDays && pkg.durationDays < filter.minDays) return false;
  if (filter.maxDays && pkg.durationDays > filter.maxDays) return false;
  if (filter.maxPrice && pkg.priceFrom > filter.maxPrice) return false;
  if (filter.featured !== undefined && pkg.isFeatured !== filter.featured) return false;
  if (filter.slugs && !filter.slugs.includes(pkg.slug)) return false;
  if (filter.excludeIds?.includes(pkg.id)) return false;

  if (filter.q) {
    const searchable = [
      pkg.title,
      pkg.subtitle,
      pkg.summary,
      pkg.startLocation,
      pkg.endLocation,
      ...pkg.tags,
      ...pkg.highlights,
      ...pkg.stayPlan.map((stop) => stop.place),
    ];
    if (!matchesSearch(filter.q, searchable)) return false;
  }
  return true;
}

const toRef = ({ id, slug, title }: TourPackage): PackageRef => ({ id, slug, title });

/**
 * In-memory catalogue backed by the static seed data.
 *
 * Besides PackageRepository it structurally satisfies the small read ports other
 * modules declare: PackageCounter (categories), PackageLookup (enquiries) and
 * the package reference readers used by blogs and testimonials.
 */
export class StaticPackageRepository implements PackageRepository {
  constructor(private readonly packages: readonly TourPackage[]) {}

  async list({ filter, sort, page, limit }: PackageListOptions): Promise<Paginated<TourPackage>> {
    const matches = this.packages.filter((pkg) => matchesFilter(pkg, filter)).sort(comparators[sort]);
    return paginateArray(matches, { page, limit });
  }

  async findBySlug(slug: string): Promise<TourPackage | null> {
    return this.packages.find((pkg) => pkg.slug === slug) ?? null;
  }

  async findUpcomingDepartures({
    from,
    limit,
    categoryIds,
  }: UpcomingDepartureCriteria): Promise<DepartureRow[]> {
    return this.packages
      .filter((pkg) => !categoryIds || categoryIds.includes(pkg.categoryId))
      .flatMap((pkg) =>
        pkg.departures
          .filter((departure) => departure.startDate >= from)
          .map((departure) => ({ pkg, departure })),
      )
      .sort(
        (a, b) =>
          a.departure.startDate.localeCompare(b.departure.startDate) ||
          a.pkg.sortOrder - b.pkg.sortOrder,
      )
      .slice(0, limit);
  }

  async countByCategory(): Promise<Record<string, number>> {
    const counts: Record<string, number> = {};
    for (const pkg of this.packages) {
      counts[pkg.categoryId] = (counts[pkg.categoryId] ?? 0) + 1;
    }
    return counts;
  }

  async findRefBySlug(slug: string): Promise<PackageRef | null> {
    const pkg = await this.findBySlug(slug);
    return pkg ? toRef(pkg) : null;
  }

  /** Returns references in the order the ids were requested. */
  async findRefsByIds(ids: readonly string[]): Promise<PackageRef[]> {
    const byId = new Map(this.packages.map((pkg) => [pkg.id, pkg]));
    return ids.flatMap((id) => {
      const pkg = byId.get(id);
      return pkg ? [toRef(pkg)] : [];
    });
  }
}
