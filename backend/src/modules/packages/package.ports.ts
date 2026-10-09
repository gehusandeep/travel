import type { CategoryRef } from '@/modules/categories/category.types';
import type { FaqView } from '@/modules/faqs/faq.types';

/**
 * Ports owned by the packages module. Other modules satisfy them structurally,
 * so this module depends on abstractions rather than concrete services.
 */

/** Category lookups. Implemented by CategoryService. */
export interface CategoryDirectory {
  findRefBySlug(slug: string): Promise<CategoryRef | null>;
  getSubtreeIds(categoryId: string): Promise<string[]>;
  getRefMap(): Promise<Map<string, CategoryRef>>;
  getTrail(categoryId: string): Promise<CategoryRef[]>;
}

/** Package-specific FAQs. Implemented by FaqService. */
export interface PackageFaqReader {
  findByPackageId(packageId: string): Promise<FaqView[]>;
}
