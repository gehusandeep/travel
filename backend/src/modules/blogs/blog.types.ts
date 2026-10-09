import type { PackageRef } from '@/modules/packages/package.types';
import type { ImageAsset, SeoMeta } from '@/shared/types';

/**
 * Blog content is stored as structured blocks instead of raw HTML. The frontend
 * renders each block with its own component, so there is no HTML injection risk.
 */
export type ContentBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; style: 'bullet' | 'number'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; tone: 'info' | 'tip' | 'warning'; title?: string; text: string };

export type HeadingBlock = Extract<ContentBlock, { type: 'heading' }>;

/** Headings get a stable anchor id so the frontend can build a table of contents. */
export type RenderedBlock = Exclude<ContentBlock, HeadingBlock> | (HeadingBlock & { id: string });

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: ImageAsset;
  author: BlogAuthor;
  tags: string[];
  content: ContentBlock[];
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  relatedPackageIds: string[];
  seo: SeoMeta;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
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
  content: RenderedBlock[];
  toc: TocItem[];
  seo: SeoMeta;
  relatedPackages: PackageRef[];
  relatedPosts: BlogSummary[];
}
