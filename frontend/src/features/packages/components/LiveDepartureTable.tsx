'use client';

import { cn } from '@/lib/utils/cn';
import { useGetPackageDeparturesQuery } from '../api/packages.api';
import type { Departure } from '../types';
import { DepartureTable } from './DepartureTable';

const POLLING_INTERVAL_MS = 60_000;

interface LiveDepartureTableProps {
  slug: string;
  packageTitle: string;
  /** Server-rendered snapshot, shown immediately and used until live data arrives. */
  initialDepartures: Departure[];
}

/**
 * Departure table with live seat availability: RTK Query polls the API every
 * minute while the tab is visible (Trip To Temples shows the same live status).
 */
export function LiveDepartureTable({ slug, packageTitle, initialDepartures }: LiveDepartureTableProps) {
  const { data, isFetching, isError } = useGetPackageDeparturesQuery(slug, {
    pollingInterval: POLLING_INTERVAL_MS,
    skipPollingIfUnfocused: true,
  });

  return (
    <div>
      <DepartureTable departures={data ?? initialDepartures} packageSlug={slug} packageTitle={packageTitle} />
      <p className="mt-3 flex items-center gap-2 text-xs text-stone-500">
        <span
          aria-hidden="true"
          className={cn(
            'h-2 w-2 rounded-full',
            isError ? 'bg-stone-400' : isFetching ? 'bg-amber-500' : 'bg-emerald-500',
          )}
        />
        {isError
          ? 'Showing the latest saved availability. Call us to confirm seats.'
          : 'Seat availability refreshes automatically every minute.'}
      </p>
    </div>
  );
}
