import { normalizeQuery } from '@/lib/http/query';
import { unwrapData, unwrapPage } from '@/store/api-utils';
import { baseApi } from '@/store/baseApi';
import type { ApiSuccess, Paginated } from '@/types/api';
import type { Departure, PackageListParams, PackageSummary } from '../types';

/** Client-side package queries: catalogue filters, search, wishlist and live seat availability. */
export const packagesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPackages: build.query<Paginated<PackageSummary>, PackageListParams>({
      query: (params) => ({ url: '/packages', params: normalizeQuery(params) }),
      transformResponse: (response: ApiSuccess<PackageSummary[]>) => unwrapPage(response),
      providesTags: (result) => [
        { type: 'Package' as const, id: 'LIST' },
        ...(result?.items.map((pkg) => ({ type: 'Package' as const, id: pkg.slug })) ?? []),
      ],
    }),
    getPackageDepartures: build.query<Departure[], string>({
      query: (slug) => `/packages/${encodeURIComponent(slug)}/departures`,
      transformResponse: (response: ApiSuccess<Departure[]>) => unwrapData(response),
      providesTags: (_result, _error, slug) => [{ type: 'Departure' as const, id: slug }],
    }),
  }),
});

export const { useGetPackagesQuery, useGetPackageDeparturesQuery } = packagesApi;
