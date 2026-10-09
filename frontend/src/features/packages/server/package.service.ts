import 'server-only';
import { cache } from 'react';
import type { HttpClient } from '@/lib/http/http-client';
import { serverHttpClient } from '@/lib/http/server-client';
import type { Paginated } from '@/types/api';
import type { PackageDetail, PackageListParams, PackageSummary, UpcomingDeparture } from '../types';

export const PACKAGES_CACHE_TAG = 'packages';

/**
 * Server-side data access for packages (used by Server Components for SEO pages).
 * Depends on the HttpClient abstraction, so it can be pointed at a mock or a
 * different backend without changing any page.
 */
export function createPackageService(http: HttpClient) {
  return {
    async list(params: PackageListParams = {}): Promise<Paginated<PackageSummary>> {
      const { data, meta } = await http.get<PackageSummary[]>('/packages', {
        query: params,
        tags: [PACKAGES_CACHE_TAG],
      });
      return {
        items: data,
        meta: meta ?? { page: 1, limit: data.length, total: data.length, totalPages: 1 },
      };
    },

    getBySlug: cache(async (slug: string): Promise<PackageDetail> => {
      const { data } = await http.get<PackageDetail>(`/packages/${encodeURIComponent(slug)}`, {
        tags: [PACKAGES_CACHE_TAG, `package:${slug}`],
      });
      return data;
    }),

    async getRelated(slug: string, limit = 3): Promise<PackageSummary[]> {
      const { data } = await http.get<PackageSummary[]>(`/packages/${encodeURIComponent(slug)}/related`, {
        query: { limit },
        tags: [PACKAGES_CACHE_TAG],
      });
      return data;
    },

    async getUpcomingDepartures(params: { limit?: number; category?: string } = {}): Promise<UpcomingDeparture[]> {
      const { data } = await http.get<UpcomingDeparture[]>('/departures/upcoming', {
        query: params,
        tags: [PACKAGES_CACHE_TAG],
        revalidate: 60,
      });
      return data;
    },
  };
}

export type PackageService = ReturnType<typeof createPackageService>;
export const packageService = createPackageService(serverHttpClient);
