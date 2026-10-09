import { ArrowRight, CalendarDays, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { WishlistButton } from '@/features/wishlist/components/WishlistButton';
import { routes } from '@/lib/routes';
import { formatDate, formatDuration, formatPrice } from '@/lib/utils/format';
import { TIER_LABELS } from '../package-labels';
import type { PackageSummary } from '../types';
import { TravelModeList } from './TravelModeList';

interface PackageCardProps {
  pkg: PackageSummary;
  /** Set for cards above the fold so the image loads eagerly (better LCP). */
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export function PackageCard({ pkg, priority = false, headingLevel: Heading = 'h3' }: PackageCardProps) {
  const route = pkg.startLocation === pkg.endLocation ? `Ex-${pkg.startLocation}` : `${pkg.startLocation} to ${pkg.endLocation}`;
  const next = pkg.nextDeparture;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-brand-700">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <Image
          src={pkg.heroImage.url}
          alt={pkg.heroImage.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge variant="light">{TIER_LABELS[pkg.tier]}</Badge>
          {next?.status === 'FILLING_FAST' ? <Badge variant="warning">Filling fast</Badge> : null}
        </div>
        <WishlistButton slug={pkg.slug} title={pkg.title} className="absolute right-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
          {route}
        </p>
        <Heading className="mt-2 text-lg font-semibold leading-snug text-ink-950">
          <Link href={routes.package(pkg.slug)} className="after:absolute after:inset-0 focus-visible:outline-none">
            {pkg.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-2 text-sm text-stone-600">{pkg.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-700">
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="h-4 w-4 text-stone-400" />
            {formatDuration(pkg.durationDays, pkg.durationNights)}
          </span>
          {next ? (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="h-4 w-4 text-stone-400" />
              Next: {formatDate(next.startDate)}
            </span>
          ) : null}
        </div>
        <TravelModeList modes={pkg.travelModes} className="mt-3" />

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-stone-100 pt-4">
          <div>
            <p className="text-xs text-stone-500">Starting from</p>
            <p className="text-xl font-bold text-ink-950">{formatPrice(pkg.priceFrom)}</p>
            <p className="text-xs text-stone-500">{pkg.priceNote}</p>
          </div>
          <span aria-hidden="true" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
            Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
