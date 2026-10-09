import type { ImageAsset, SeoMeta } from '@/types/api';

export interface CategoryRef {
  id: string;
  slug: string;
  name: string;
  /** Slugs from the root category down, e.g. ['uttarakhand', 'adi-kailash-yatra']. */
  path: string[];
}

export interface Category extends CategoryRef {
  shortDescription: string;
  description: string;
  image: ImageAsset;
  isFeatured: boolean;
  packageCount: number;
  seo: SeoMeta;
}

export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
}

export interface CategoryDetail {
  category: Category;
  ancestors: CategoryRef[];
  children: Category[];
}

export interface CategoryOption {
  slug: string;
  name: string;
  depth: number;
}
