'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetPackagesQuery } from '@/features/packages/api/packages.api';
import { PackageCardSkeleton } from '@/features/packages/components/PackageCardSkeleton';
import { PackageGrid } from '@/features/packages/components/PackageGrid';
import { routes } from '@/lib/routes';
import { pluralize } from '@/lib/utils/format';
import { getErrorMessage } from '@/store/api-utils';

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 350;
const SUGGESTIONS = ['Kailash', 'Adi Kailash', 'Kedarnath', 'Helicopter', 'Muktinath', 'Varanasi'];

/** Search-as-you-type over the package catalogue (RTK Query caches each term). */
export function SearchView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery.trim());

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  // Keep the URL shareable: /search?q=kailash
  useEffect(() => {
    const search = debouncedQuery ? `?q=${encodeURIComponent(debouncedQuery)}` : '';
    router.replace(`${pathname}${search}`, { scroll: false });
  }, [debouncedQuery, pathname, router]);

  const shouldSearch = debouncedQuery.length >= MIN_QUERY_LENGTH;
  const { data, isFetching, isError, error } = useGetPackagesQuery(
    { q: debouncedQuery, limit: 24 },
    { skip: !shouldSearch },
  );

  return (
    <div>
      <form role="search" onSubmit={(event) => event.preventDefault()} className="mx-auto max-w-2xl">
        <label htmlFor="site-search" className="sr-only">
          Search tour packages
        </label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
          <input
            id="site-search"
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destinations, temples or travel modes"
            className="block w-full rounded-full border border-stone-300 bg-white py-4 pl-14 pr-5 text-base text-ink-950 shadow-sm placeholder:text-stone-400 focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-600/15"
          />
        </div>
        <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Popular searches">
          {SUGGESTIONS.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => setQuery(suggestion)}
                className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm text-stone-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      </form>

      <div className="mt-12">
        <p className="mb-6 text-sm text-stone-600" aria-live="polite">
          {!shouldSearch
            ? `Type at least ${MIN_QUERY_LENGTH} characters to search.`
            : isFetching && !data
              ? 'Searching…'
              : data
                ? `${pluralize(data.meta.total, 'result')} for “${debouncedQuery}”`
                : ''}
        </p>

        {!shouldSearch ? null : isError ? (
          <p role="alert" className="rounded-2xl bg-red-50 p-4 text-sm text-red-800">
            {getErrorMessage(error)}
          </p>
        ) : !data ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <li key={index}>
                <PackageCardSkeleton />
              </li>
            ))}
          </ul>
        ) : (
          <PackageGrid
            packages={data.items}
            emptyTitle="No matching packages"
            emptyDescription="Try a different spelling or a nearby destination."
            emptyAction={
              <Link href={routes.packages} className="font-semibold text-brand-700 hover:underline">
                Browse all packages
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
