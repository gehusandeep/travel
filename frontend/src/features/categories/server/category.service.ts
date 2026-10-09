import 'server-only';
import { cache } from 'react';
import type { HttpClient } from '@/lib/http/http-client';
import { serverHttpClient } from '@/lib/http/server-client';
import type { CategoryDetail, CategoryTreeNode } from '../types';

export const CATEGORIES_CACHE_TAG = 'categories';

export function createCategoryService(http: HttpClient) {
  return {
    getTree: cache(async (): Promise<CategoryTreeNode[]> => {
      const { data } = await http.get<CategoryTreeNode[]>('/categories', { tags: [CATEGORIES_CACHE_TAG] });
      return data;
    }),

    getBySlug: cache(async (slug: string): Promise<CategoryDetail> => {
      const { data } = await http.get<CategoryDetail>(`/categories/${encodeURIComponent(slug)}`, {
        tags: [CATEGORIES_CACHE_TAG],
      });
      return data;
    }),
  };
}

export type CategoryService = ReturnType<typeof createCategoryService>;
export const categoryService = createCategoryService(serverHttpClient);
