import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EnquiryButton } from '@/features/enquiry/components/EnquiryButton';
import { StayPlan } from '@/features/packages/components/StayPlan';
import type { PackageDetail } from '@/features/packages/types';
import { routes } from '@/lib/routes';
import { formatDateRange, formatDuration, formatPrice } from '@/lib/utils/format';

/** One route option inside the landing page tabs: summary, stay plan, price and CTAs. */
export function LandingPackagePanel({ pkg }: { pkg: PackageDetail }) {
  return (
    <article className="grid gap-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm lg:grid-cols-[1fr_20rem] lg:p-8">
      <div>
        <ul className="flex flex-wrap gap-2">
          {pkg.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="brand">{tag}</Badge>
            </li>
          ))}
          <li>
            <Badge>{formatDuration(pkg.durationDays, pkg.durationNights)}</Badge>
          </li>
        </ul>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink-950">{pkg.title}</h3>
        <p className="mt-3 leading-relaxed text-stone-700">{pkg.summary}</p>
        <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-stone-500">Stay plan</h4>
        <StayPlan stops={pkg.stayPlan} className="mt-3" />
        <p className="mt-6 text-sm text-stone-700">
          <strong className="text-ink-950">Best for:</strong> {pkg.bestFor}
        </p>
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-2xl bg-stone-50 p-6">
        <div>
          <p className="text-sm text-stone-500">Starting from</p>
          <p className="text-3xl font-bold text-ink-950">{formatPrice(pkg.priceFrom)}</p>
          <p className="text-sm text-stone-500">{pkg.priceNote}</p>
          {pkg.nextDeparture ? (
            <p className="mt-3 text-sm text-stone-700">
              Next batch:{' '}
              <strong className="text-ink-950">
                {formatDateRange(pkg.nextDeparture.startDate, pkg.nextDeparture.endDate)}
              </strong>
            </p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <EnquiryButton packageSlug={pkg.slug} packageTitle={pkg.title} source="LANDING_PAGE">
            Get this itinerary
          </EnquiryButton>
          <Button href={routes.package(pkg.slug)} variant="outline">
            View full itinerary
          </Button>
        </div>
      </div>
    </article>
  );
}
