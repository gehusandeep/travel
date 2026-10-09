import type { PackageRef } from '@/features/packages/types';
import type { ImageAsset, SeoMeta } from '@/types/api';

/** Structured article blocks rendered by BlogContent. No raw HTML is ever injected. */
export type ContentBlock =
  | { type: 'heading'; level: 2 | 3; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; style: 'bullet' | 'number'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; tone: 'info' | 'tip' | 'warning'; title?: string; text: string };

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: ImageAsset;
  author: BlogAuthor;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
}

export interface BlogDetail extends BlogSummary {
  content: ContentBlock[];
  toc: TocItem[];
  seo: SeoMeta;
  relatedPackages: PackageRef[];
  relatedPosts: BlogSummary[];
}

export interface BlogListParams {
  tag?: string;
  page?: number;
  limit?: number;
}
