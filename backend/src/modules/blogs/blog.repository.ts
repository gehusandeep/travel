import { paginateArray, type Paginated } from '@/core/http/pagination';
import { slugify } from '@/core/utils/text';
import type { BlogPost } from './blog.types';

export interface BlogListFilter {
  tag?: string;
  page: number;
  limit: number;
}

export interface BlogRepository {
  list(filter: BlogListFilter): Promise<Paginated<BlogPost>>;
  findBySlug(slug: string): Promise<BlogPost | null>;
  findRelated(post: BlogPost, limit: number): Promise<BlogPost[]>;
}

/** Published posts only, newest first. */
export class StaticBlogRepository implements BlogRepository {
  private readonly posts: readonly BlogPost[];

  constructor(posts: readonly BlogPost[]) {
    this.posts = posts
      .filter((post) => post.isPublished)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  async list({ tag, page, limit }: BlogListFilter): Promise<Paginated<BlogPost>> {
    const tagSlug = tag ? slugify(tag) : undefined;
    const matches = tagSlug
      ? this.posts.filter((post) => post.tags.some((item) => slugify(item) === tagSlug))
      : this.posts;
    return paginateArray(matches, { page, limit });
  }

  async findBySlug(slug: string): Promise<BlogPost | null> {
    return this.posts.find((post) => post.slug === slug) ?? null;
  }

  /** Posts sharing the most tags first, then the most recent. */
  async findRelated(post: BlogPost, limit: number): Promise<BlogPost[]> {
    const sharedTags = (candidate: BlogPost) =>
      candidate.tags.filter((tag) => post.tags.includes(tag)).length;

    return this.posts
      .filter((candidate) => candidate.id !== post.id)
      .sort((a, b) => sharedTags(b) - sharedTags(a) || b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, limit);
  }
}
