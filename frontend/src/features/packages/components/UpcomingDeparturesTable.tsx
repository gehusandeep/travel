import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { EnquiryButton } from '@/features/enquiry/components/EnquiryButton';
import type { EnquirySource } from '@/features/enquiry/types';
import { routes } from '@/lib/routes';
import { formatDateRange, formatPrice, formatShortDuration } from '@/lib/utils/format';
import { DEPARTURE_STATUS_BADGES, DEPARTURE_STATUS_LABELS } from '../package-labels';
import type { UpcomingDeparture } from '../types';

interface UpcomingDeparturesTableProps {
  departures: readonly UpcomingDeparture[];
  caption: string;
  source?: EnquirySource;
}

/** Cross-catalogue batch schedule for the home and campaign landing pages. */
export function UpcomingDeparturesTable({ departures, caption, source = 'ENQUIRY_MODAL' }: UpcomingDeparturesTableProps) {
  if (departures.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
      <table className="w-full min-w-[52rem] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Yatra</th>
            <th scope="col" className="px-4 py-3 font-semibold">Dates</th>
            <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
            <th scope="col" className="px-4 py-3 font-semibold">Starts from</th>
            <th scope="col" className="px-4 py-3 font-semibold">Price</th>
            <th scope="col" className="px-4 py-3 font-semibold">Status</th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {departures.map((departure) => {
            const dates = formatDateRange(departure.startDate, departure.endDate);
            const soldOut = departure.status === 'SOLD_OUT';
            return (
              <tr key={departure.id}>
                <th scope="row" className="px-4 py-3">
                  <Link
                    href={routes.package(departure.package.slug)}
                    className="font-semibold text-ink-950 transition-colors hover:text-brand-700"
                  >
                    {departure.package.title}
                  </Link>
                  <span className="mt-0.5 block text-xs font-normal text-stone-500">
                    {departure.code}
                    {departure.note ? ` · ${departure.note}` : ''}
                  </span>
                </th>
                <td className="whitespace-nowrap px-4 py-3 text-stone-700">{dates}</td>
                <td className="whitespace-nowrap px-4 py-3 text-stone-700">
                  {formatShortDuration(departure.package.durationDays, departure.package.durationNights)}
                </td>
                <td className="px-4 py-3 text-stone-700">{departure.package.startLocation}</td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-ink-950">{formatPrice(departure.price)}</td>
                <td className="px-4 py-3">
                  <Badge variant={DEPARTURE_STATUS_BADGES[departure.status]}>
                    {DEPARTURE_STATUS_LABELS[departure.status]}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <EnquiryButton
                    size="sm"
                    variant={soldOut ? 'ghost' : 'outline'}
                    packageSlug={departure.package.slug}
                    packageTitle={departure.package.title}
                    source={source}
                    message={
                      soldOut
                        ? `Please add me to the waitlist for batch ${departure.code} (${dates}).`
                        : `I am interested in batch ${departure.code} (${dates}).`
                    }
                  >
                    {soldOut ? 'Waitlist' : 'Enquire'}
                  </EnquiryButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
