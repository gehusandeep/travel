import type { Category } from './category.types';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
}

/** Serves categories from in-memory seed data. Swap for a database implementation later. */
export class StaticCategoryRepository implements CategoryRepository {
  private readonly categories: readonly Category[];

  constructor(categories: readonly Category[]) {
    this.categories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async findAll(): Promise<Category[]> {
    return [...this.categories];
  }
}
