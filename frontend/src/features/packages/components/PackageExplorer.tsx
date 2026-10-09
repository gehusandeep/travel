'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import type { CategoryOption } from '@/features/categories/types';
import { cn } from '@/lib/utils/cn';
import { pluralize } from '@/lib/utils/format';
import { getErrorMessage } from '@/store/api-utils';
import type { Paginated } from '@/types/api';
import { useGetPackagesQuery } from '../api/packages.api';
import {
  countActiveFilters,
  DEFAULT_FILTERS,
  isDefaultView,
  parseFilters,
  toApiParams,
  toSearchString,
  type ExplorerFilters,
} from '../explorer-filters';
import { SORT_LABELS } from '../package-labels';
import { PACKAGE_SORTS, type PackageSummary } from '../types';
import { PackageCardSkeleton } from './PackageCardSkeleton';
import { PackageFilters } from './PackageFilters';
import { PackageGrid } from './PackageGrid';

interface PackageExplorerProps {
  /** Server-rendered first page, shown until the visitor changes a filter (SEO + instant paint). */
  initial: Paginated<PackageSummary>;
  categoryOptions: CategoryOption[];
  /** Fixes the category, e.g. on a destination page. */
  lockedCategory?: string;
  pageSize?: number;
}

/**
 * Catalogue with filters kept in the URL (shareable, back-button friendly).
 * The default view uses server-rendered data; any filter change is fetched
 * through RTK Query, which caches every combination the visitor has seen.
 */
export function PackageExplorer({ initial, categoryOptions, lockedCategory, pageSize = 24 }: PackageExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => parseFilters(searchParams, lockedCategory), [searchParams, lockedCategory]);
  const showInitial = isDefaultView(filters, lockedCategory);

  const { data, isFetching, isError, error, refetch } = useGetPackagesQuery(toApiParams(filters, pageSize), {
    skip: showInitial,
  });
  const result = showInitial ? initial : data;

  const applyFilters = useCallback(
    (patch: Partial<ExplorerFilters>) => {
      const next: ExplorerFilters = { ...filters, ...patch, page: patch.page ?? 1 };
      router.replace(`${pathname}${toSearchString(next, lockedCategory)}`, { scroll: false });
    },
    [filters, lockedCategory, pathname, router],
  );

  const resetFilters = useCallback(
    () => applyFilters({ ...DEFAULT_FILTERS, category: lockedCategory ?? '' }),
    [applyFilters, lockedCategory],
  );

  const goToPage = (page: number) => {
    applyFilters({ page });
    document.getElementById('package-results')?.scrollIntoView({ block: 'start' });
  };

  const total = result?.meta.total ?? 0;
  const totalPages = result?.meta.totalPages ?? 1;
  const currentPage = result?.meta.page ?? filters.page;

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <PackageFilters
        filters={filters}
        categoryOptions={categoryOptions}
        showCategory={!lockedCategory}
        activeCount={countActiveFilters(filters, lockedCategory)}
        onChange={applyFilters}
        onReset={resetFilters}
      />

      <section id="package-results" aria-labelledby="package-results-heading" className="scroll-mt-32">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 id="package-results-heading" className="text-sm font-medium text-stone-600" aria-live="polite">
            {result ? `${pluralize(total, 'package')} found` : 'Loading packages…'}
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="package-sort" className="text-sm text-stone-600">
              Sort by
            </label>
            <select
              id="package-sort"
              value={filters.sort}
              onChange={(event) => applyFilters({ sort: event.target.value as ExplorerFilters['sort'] })}
              className="rounded-xl border border-stone-300 bg-white py-2 pl-3 pr-8 text-sm text-ink-950 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
            >
              {PACKAGE_SORTS.map((sort) => (
                <option key={sort} value={sort}>
                  {SORT_LABELS[sort]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isError && !showInitial ? (
          <div role="alert" className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-800">{getErrorMessage(error)}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        ) : !result ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <li key={index}>
                <PackageCardSkeleton />
              </li>
            ))}
          </ul>
        ) : (
          <div aria-busy={isFetching} className={cn('transition-opacity', isFetching && 'opacity-60')}>
            <PackageGrid
              packages={result.items}
              columns={2}
              priorityCount={2}
              emptyAction={
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Clear filters
                </Button>
              }
            />
          </div>
        )}

        {totalPages > 1 ? (
          <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3">
            <Button variant="outline" size="sm" disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-stone-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </nav>
        ) : null}
      </section>
    </div>
  );
}
