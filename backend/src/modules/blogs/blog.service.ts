import { NotFoundError } from '@/core/errors';
import type { Paginated } from '@/core/http/pagination';
import { getReadingMinutes, renderBlocks } from './blog.content';
import type { RelatedPackageReader } from './blog.ports';
import type { BlogRepository } from './blog.repository';
import type { BlogListQuery } from './blog.schema';
import type { BlogDetail, BlogPost, BlogSummary } from './blog.types';

const RELATED_POSTS_LIMIT = 3;

const toBlogSummary = (post: BlogPost): BlogSummary => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  coverImage: post.coverImage,
  author: post.author,
  tags: post.tags,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  readingMinutes: getReadingMinutes(post.content),
});

export class BlogService {
  constructor(
    private readonly repository: BlogRepository,
    private readonly packages: RelatedPackageReader,
  ) {}

  async list(query: BlogListQuery): Promise<Paginated<BlogSummary>> {
    const { items, total } = await this.repository.list(query);
    return { items: items.map(toBlogSummary), total };
  }

  async getBySlug(slug: string): Promise<BlogDetail> {
    const post = await this.repository.findBySlug(slug);
    if (!post) throw new NotFoundError('Blog post');

    const [relatedPosts, relatedPackages] = await Promise.all([
      this.repository.findRelated(post, RELATED_POSTS_LIMIT),
      this.packages.findRefsByIds(post.relatedPackageIds),
    ]);
    const { content, toc } = renderBlocks(post.content);

    return {
      ...toBlogSummary(post),
      content,
      toc,
      seo: post.seo,
      relatedPackages,
      relatedPosts: relatedPosts.map(toBlogSummary),
    };
  }
}
