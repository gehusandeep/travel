import type { CategoryRef } from '@/modules/categories/category.types';
import type { FaqView } from '@/modules/faqs/faq.types';
import type { ImageAsset, SeoMeta } from '@/shared/types';

export const PACKAGE_REGIONS = ['DOMESTIC', 'INTERNATIONAL'] as const;
export const PACKAGE_TIERS = ['BUDGET', 'STANDARD', 'DELUXE', 'PREMIUM'] as const;
export const TRAVEL_MODES = ['ROAD', 'FLIGHT', 'HELICOPTER', 'TREK'] as const;
export const DIFFICULTY_LEVELS = ['EASY', 'MODERATE', 'CHALLENGING'] as const;
export const MEALS = ['BREAKFAST', 'LUNCH', 'DINNER'] as const;
export const PACKAGE_SORTS = [
  'recommended',
  'price-asc',
  'price-desc',
  'duration-asc',
  'duration-desc',
] as const;
export const DEPARTURE_STATUSES = ['AVAILABLE', 'FILLING_FAST', 'SOLD_OUT'] as const;

export type PackageRegion = (typeof PACKAGE_REGIONS)[number];
export type PackageTier = (typeof PACKAGE_TIERS)[number];
export type TravelMode = (typeof TRAVEL_MODES)[number];
export type Difficulty = (typeof DIFFICULTY_LEVELS)[number];
export type Meal = (typeof MEALS)[number];
export type PackageSort = (typeof PACKAGE_SORTS)[number];
export type DepartureStatus = (typeof DEPARTURE_STATUSES)[number];

/** One leg of the stay plan, e.g. "Purang (2N)". */
export interface StayStop {
  place: string;
  nights: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: Meal[];
  overnight?: string;
  distance?: string;
  altitude?: string;
}

/** A scheduled batch (fixed departure) of a package. */
export interface Departure {
  id: string;
  code: string;
  /** ISO date, YYYY-MM-DD */
  startDate: string;
  /** ISO date, YYYY-MM-DD */
  endDate: string;
  price: number;
  totalSeats: number;
  bookedSeats: number;
  note?: string;
}

export interface DepartureView {
  id: string;
  code: string;
  startDate: string;
  endDate: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  status: DepartureStatus;
  note?: string;
}

/**
 * How a seat is reserved: a token amount per traveller, with the balance paid
 * at the start of the journey (the agency's current booking model).
 */
export interface BookingTerms {
  /** Token amount per traveller, in INR. */
  tokenAmount: number;
  /** Hosted payment page for the token (HTTPS only), e.g. a Razorpay Payment Page. */
  paymentUrl?: string;
}

/** Full package aggregate as stored by a repository. */
export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  overview: string[];
  categoryId: string;
  region: PackageRegion;
  tier: PackageTier;
  travelModes: TravelMode[];
  difficulty: Difficulty;
  tags: string[];
  durationDays: number;
  durationNights: number;
  startLocation: string;
  endLocation: string;
  stayPlan: StayStop[];
  maxAltitude?: string;
  bestTime: string;
  bestFor: string;
  groupSize?: string;
  /** Lowest per-person price in INR. */
  priceFrom: number;
  priceNote: string;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  thingsToCarry: string[];
  itinerary: ItineraryDay[];
  departures: Departure[];
  booking?: BookingTerms;
  isFeatured: boolean;
  sortOrder: number;
  seo: SeoMeta;
  /** ISO datetime, used for sitemap lastModified. */
  updatedAt: string;
}

export interface PackageRef {
  id: string;
  slug: string;
  title: string;
}

/** Card-sized view used by listings. */
export interface PackageSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: CategoryRef;
  region: PackageRegion;
  tier: PackageTier;
  travelModes: TravelMode[];
  difficulty: Difficulty;
  tags: string[];
  durationDays: number;
  durationNights: number;
  startLocation: string;
  endLocation: string;
  priceFrom: number;
  priceNote: string;
  heroImage: ImageAsset;
  isFeatured: boolean;
  nextDeparture: DepartureView | null;
  updatedAt: string;
}

/** Package facts shown next to a departure in cross-catalogue schedules. */
export interface DeparturePackageInfo {
  id: string;
  slug: string;
  title: string;
  durationDays: number;
  durationNights: number;
  startLocation: string;
  endLocation: string;
  travelModes: TravelMode[];
  category: CategoryRef;
}

export interface UpcomingDeparture extends DepartureView {
  package: DeparturePackageInfo;
}

export interface PackageDetail extends PackageSummary {
  subtitle: string;
  overview: string[];
  stayPlan: StayStop[];
  maxAltitude?: string;
  bestTime: string;
  bestFor: string;
  groupSize?: string;
  gallery: ImageAsset[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  thingsToCarry: string[];
  itinerary: ItineraryDay[];
  /** Upcoming departures only, sorted by date. */
  departures: DepartureView[];
  /** null when seats are reserved by phone only. */
  booking: BookingTerms | null;
  /** Category trail from the root category to this package's category. */
  breadcrumb: CategoryRef[];
  faqs: FaqView[];
  seo: SeoMeta;
}
