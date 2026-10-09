'use client';

import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { useGetPackagesQuery } from '@/features/packages/api/packages.api';
import { PackageCardSkeleton } from '@/features/packages/components/PackageCardSkeleton';
import { PackageGrid } from '@/features/packages/components/PackageGrid';
import type { PackageSummary } from '@/features/packages/types';
import { routes } from '@/lib/routes';
import { pluralize } from '@/lib/utils/format';
import { getErrorMessage } from '@/store/api-utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MAX_WISHLIST_ITEMS, selectWishlistHydrated, selectWishlistSlugs, wishlistCleared } from '../wishlist.slice';

/** Saved packages, stored in the browser and fetched by slug through RTK Query. */
export function WishlistView() {
  const dispatch = useAppDispatch();
  const slugs = useAppSelector(selectWishlistSlugs);
  const hydrated = useAppSelector(selectWishlistHydrated);

  const { data, isLoading, isError, error, refetch } = useGetPackagesQuery(
    { slugs, limit: MAX_WISHLIST_ITEMS },
    { skip: !hydrated || slugs.length === 0 },
  );

  if (!hydrated || isLoading) {
    return (
      <ul aria-busy="true" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <li key={index}>
            <PackageCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (slugs.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        description="Tap the heart on any package to save it here and compare later."
        action={<Button href={routes.packages}>Browse packages</Button>}
      />
    );
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-semibold text-red-800">{getErrorMessage(error)}</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  // Keep the order the visitor saved them in (most recent first).
  const bySlug = new Map((data?.items ?? []).map((pkg) => [pkg.slug, pkg]));
  const packages = slugs.map((slug) => bySlug.get(slug)).filter((pkg): pkg is PackageSummary => Boolean(pkg));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-stone-600">{pluralize(packages.length, 'saved package')}</p>
        <Button variant="ghost" size="sm" onClick={() => dispatch(wishlistCleared())}>
          Clear wishlist
        </Button>
      </div>
      <PackageGrid packages={packages} />
    </div>
  );
}
