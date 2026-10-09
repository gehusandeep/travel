import type { ImageAsset, SeoMeta } from '@/shared/types';

/** Destination / theme category. Categories nest (e.g. Uttarakhand → Adi Kailash). */
export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: ImageAsset;
  parentId: string | null;
  sortOrder: number;
  isFeatured: boolean;
  seo: SeoMeta;
}

/** Lightweight reference embedded in other resources (packages, breadcrumbs). */
export interface CategoryRef {
  id: string;
  slug: string;
  name: string;
  /** Slugs from the root category down to this one, e.g. ['uttarakhand', 'adi-kailash-yatra']. */
  path: string[];
}

export interface CategoryView extends CategoryRef {
  shortDescription: string;
  description: string;
  image: ImageAsset;
  isFeatured: boolean;
  /** Packages in this category and all of its sub-categories. */
  packageCount: number;
  seo: SeoMeta;
}

export interface CategoryTreeNode extends CategoryView {
  children: CategoryTreeNode[];
}

export interface CategoryDetail {
  category: CategoryView;
  ancestors: CategoryRef[];
  children: CategoryView[];
}
