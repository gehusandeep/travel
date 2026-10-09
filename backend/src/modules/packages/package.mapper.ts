import type { CategoryRef } from '@/modules/categories/category.types';
import type { FaqView } from '@/modules/faqs/faq.types';
import { getNextDeparture, getUpcomingDepartures, toDepartureView } from './departure-availability';
import type { DepartureRow } from './package.repository';
import type {
  BookingTerms,
  PackageDetail,
  PackageSummary,
  TourPackage,
  UpcomingDeparture,
} from './package.types';

/** Used when a package points at a category that no longer exists. */
export const fallbackCategoryRef = (categoryId: string): CategoryRef => ({
  id: categoryId,
  slug: 'tours',
  name: 'Tours',
  path: [],
});

/** Drops payment links that are not HTTPS, so stored data can never inject a javascript: URL. */
function toBookingTerms(booking: BookingTerms | undefined): BookingTerms | null {
  if (!booking) return null;
  const { tokenAmount, paymentUrl } = booking;
  const isSafeUrl = paymentUrl !== undefined && URL.canParse(paymentUrl) && new URL(paymentUrl).protocol === 'https:';
  return isSafeUrl ? { tokenAmount, paymentUrl } : { tokenAmount };
}

export function toPackageSummary(pkg: TourPackage, category: CategoryRef, today: string): PackageSummary {
  return {
    id: pkg.id,
    slug: pkg.slug,
    title: pkg.title,
    summary: pkg.summary,
    category,
    region: pkg.region,
    tier: pkg.tier,
    travelModes: pkg.travelModes,
    difficulty: pkg.difficulty,
    tags: pkg.tags,
    durationDays: pkg.durationDays,
    durationNights: pkg.durationNights,
    startLocation: pkg.startLocation,
    endLocation: pkg.endLocation,
    priceFrom: pkg.priceFrom,
    priceNote: pkg.priceNote,
    heroImage: pkg.heroImage,
    isFeatured: pkg.isFeatured,
    nextDeparture: getNextDeparture(pkg.departures, today),
    updatedAt: pkg.updatedAt,
  };
}

interface DetailContext {
  breadcrumb: CategoryRef[];
  faqs: FaqView[];
  today: string;
}

export function toPackageDetail(
  pkg: TourPackage,
  category: CategoryRef,
  { breadcrumb, faqs, today }: DetailContext,
): PackageDetail {
  return {
    ...toPackageSummary(pkg, category, today),
    subtitle: pkg.subtitle,
    overview: pkg.overview,
    stayPlan: pkg.stayPlan,
    maxAltitude: pkg.maxAltitude,
    bestTime: pkg.bestTime,
    bestFor: pkg.bestFor,
    groupSize: pkg.groupSize,
    gallery: pkg.gallery,
    highlights: pkg.highlights,
    inclusions: pkg.inclusions,
    exclusions: pkg.exclusions,
    thingsToCarry: pkg.thingsToCarry,
    itinerary: pkg.itinerary,
    departures: getUpcomingDepartures(pkg.departures, today),
    booking: toBookingTerms(pkg.booking),
    breadcrumb,
    faqs,
    seo: pkg.seo,
  };
}

export function toUpcomingDeparture({ pkg, departure }: DepartureRow, category: CategoryRef): UpcomingDeparture {
  return {
    ...toDepartureView(departure),
    package: {
      id: pkg.id,
      slug: pkg.slug,
      title: pkg.title,
      durationDays: pkg.durationDays,
      durationNights: pkg.durationNights,
      startLocation: pkg.startLocation,
      endLocation: pkg.endLocation,
      travelModes: pkg.travelModes,
      category,
    },
  };
}
