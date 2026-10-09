import 'server-only';
import { cache } from 'react';
import type { HttpClient } from '@/lib/http/http-client';
import { serverHttpClient } from '@/lib/http/server-client';
import type { Paginated } from '@/types/api';
import type { BlogDetail, BlogListParams, BlogSummary } from '../types';

export const BLOG_CACHE_TAG = 'blog';

export function createBlogService(http: HttpClient) {
  return {
    async list(params: BlogListParams = {}): Promise<Paginated<BlogSummary>> {
      const { data, meta } = await http.get<BlogSummary[]>('/blogs', { query: params, tags: [BLOG_CACHE_TAG] });
      return {
        items: data,
        meta: meta ?? { page: 1, limit: data.length, total: data.length, totalPages: 1 },
      };
    },

    getBySlug: cache(async (slug: string): Promise<BlogDetail> => {
      const { data } = await http.get<BlogDetail>(`/blogs/${encodeURIComponent(slug)}`, {
        tags: [BLOG_CACHE_TAG, `blog:${slug}`],
      });
      return data;
    }),
  };
}

export type BlogService = ReturnType<typeof createBlogService>;
export const blogService = createBlogService(serverHttpClient);
