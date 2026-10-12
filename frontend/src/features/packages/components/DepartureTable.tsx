import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { EnquiryButton } from '@/features/enquiry/components/EnquiryButton';
import { formatDateRange, formatPrice } from '@/lib/utils/format';
import { DEPARTURE_STATUS_BADGES, DEPARTURE_STATUS_LABELS } from '../package-labels';
import type { Departure } from '../types';

interface DepartureTableProps {
  departures: readonly Departure[];
  packageSlug: string;
  packageTitle: string;
}

/** Batch schedule for one package (presentational; data comes from the parent). */
export function DepartureTable({ departures, packageSlug, packageTitle }: DepartureTableProps) {
  if (departures.length === 0) {
    return (
      <EmptyState
        title="New dates coming soon"
        description="We are finalising the next departures for this yatra. Send an enquiry and we will share the dates first."
      />
    );
  }

  return (
    // `relative` keeps the sr-only cells inside the scroller (see UpcomingDeparturesTable).
    <div className="relative overflow-x-auto rounded-3xl border border-stone-200 bg-white">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <caption className="sr-only">Upcoming fixed departures for {packageTitle}</caption>
        <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Batch</th>
            <th scope="col" className="px-4 py-3 font-semibold">Dates</th>
            <th scope="col" className="px-4 py-3 font-semibold">Seats left</th>
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
                <th scope="row" className="px-4 py-3 font-semibold text-ink-950">
                  {departure.code}
                  {departure.note ? (
                    <span className="mt-0.5 block text-xs font-normal text-stone-500">{departure.note}</span>
                  ) : null}
                </th>
                <td className="whitespace-nowrap px-4 py-3 text-stone-700">{dates}</td>
                <td className="px-4 py-3 text-stone-700">
                  {soldOut ? 'None' : `${departure.availableSeats} of ${departure.totalSeats}`}
                </td>
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
                    packageSlug={packageSlug}
                    packageTitle={packageTitle}
                    source="PACKAGE_PAGE"
                    message={
                      soldOut
                        ? `Please add me to the waitlist for batch ${departure.code} (${dates}).`
                        : `I am interested in batch ${departure.code} (${dates}).`
                    }
                  >
                    {soldOut ? 'Join waitlist' : 'Book seat'}
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
