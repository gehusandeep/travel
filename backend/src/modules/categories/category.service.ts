import { NotFoundError } from '@/core/errors';
import type { PackageCounter } from './category.ports';
import type { CategoryRepository } from './category.repository';
import type {
  Category,
  CategoryDetail,
  CategoryRef,
  CategoryTreeNode,
  CategoryView,
} from './category.types';

interface CategoryIndex {
  byId: Map<string, Category>;
  bySlug: Map<string, Category>;
  childrenOf: Map<string | null, Category[]>;
}

/**
 * Builds the category tree and resolves category paths. Its public read methods
 * also satisfy the `CategoryDirectory` port used by the packages module.
 */
export class CategoryService {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly packageCounter: PackageCounter,
  ) {}

  async getTree(): Promise<CategoryTreeNode[]> {
    const [index, counts] = await Promise.all([this.loadIndex(), this.packageCounter.countByCategory()]);
    const build = (category: Category): CategoryTreeNode => ({
      ...this.toView(category, index, counts),
      children: this.childrenOf(category.id, index).map(build),
    });
    return this.childrenOf(null, index).map(build);
  }

  async getDetail(slug: string): Promise<CategoryDetail> {
    const [index, counts] = await Promise.all([this.loadIndex(), this.packageCounter.countByCategory()]);
    const category = index.bySlug.get(slug);
    if (!category) throw new NotFoundError('Category');

    return {
      category: this.toView(category, index, counts),
      ancestors: this.trail(category, index).slice(0, -1),
      children: this.childrenOf(category.id, index).map((child) => this.toView(child, index, counts)),
    };
  }

  async findRefBySlug(slug: string): Promise<CategoryRef | null> {
    const index = await this.loadIndex();
    const category = index.bySlug.get(slug);
    return category ? this.toRef(category, index) : null;
  }

  async getSubtreeIds(categoryId: string): Promise<string[]> {
    return this.subtreeIds(categoryId, await this.loadIndex());
  }

  async getRefMap(): Promise<Map<string, CategoryRef>> {
    const index = await this.loadIndex();
    return new Map(
      [...index.byId.values()].map((category) => [category.id, this.toRef(category, index)]),
    );
  }

  async getTrail(categoryId: string): Promise<CategoryRef[]> {
    const index = await this.loadIndex();
    const category = index.byId.get(categoryId);
    return category ? this.trail(category, index) : [];
  }

  private async loadIndex(): Promise<CategoryIndex> {
    const categories = await this.repository.findAll();
    const index: CategoryIndex = { byId: new Map(), bySlug: new Map(), childrenOf: new Map() };

    for (const category of categories) {
      index.byId.set(category.id, category);
      index.bySlug.set(category.slug, category);
      const siblings = index.childrenOf.get(category.parentId) ?? [];
      siblings.push(category);
      index.childrenOf.set(category.parentId, siblings);
    }
    return index;
  }

  private childrenOf(parentId: string | null, index: CategoryIndex): Category[] {
    return index.childrenOf.get(parentId) ?? [];
  }

  /** Categories from the root down to `category`. Guards against accidental cycles. */
  private chain(category: Category, index: CategoryIndex): Category[] {
    const chain: Category[] = [];
    const seen = new Set<string>();
    let current: Category | undefined = category;

    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      chain.unshift(current);
      current = current.parentId ? index.byId.get(current.parentId) : undefined;
    }
    return chain;
  }

  private toRef(category: Category, index: CategoryIndex): CategoryRef {
    return {
      id: category.id,
      slug: category.slug,
      name: category.name,
      path: this.chain(category, index).map((item) => item.slug),
    };
  }

  private trail(category: Category, index: CategoryIndex): CategoryRef[] {
    return this.chain(category, index).map((item) => this.toRef(item, index));
  }

  private subtreeIds(categoryId: string, index: CategoryIndex, seen = new Set<string>()): string[] {
    if (seen.has(categoryId)) return [];
    seen.add(categoryId);
    return [
      categoryId,
      ...this.childrenOf(categoryId, index).flatMap((child) => this.subtreeIds(child.id, index, seen)),
    ];
  }

  private toView(
    category: Category,
    index: CategoryIndex,
    counts: Record<string, number>,
  ): CategoryView {
    const packageCount = this.subtreeIds(category.id, index).reduce(
      (sum, id) => sum + (counts[id] ?? 0),
      0,
    );

    return {
      ...this.toRef(category, index),
      shortDescription: category.shortDescription,
      description: category.description,
      image: category.image,
      isFeatured: category.isFeatured,
      packageCount,
      seo: category.seo,
    };
  }
}
