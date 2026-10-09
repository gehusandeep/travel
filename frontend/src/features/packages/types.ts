import type { CategoryRef } from '@/features/categories/types';
import type { Faq } from '@/features/faqs/types';
import type { ImageAsset, SeoMeta } from '@/types/api';

export const PACKAGE_REGIONS = ['DOMESTIC', 'INTERNATIONAL'] as const;
export const PACKAGE_TIERS = ['BUDGET', 'STANDARD', 'DELUXE', 'PREMIUM'] as const;
export const TRAVEL_MODES = ['ROAD', 'FLIGHT', 'HELICOPTER', 'TREK'] as const;
export const PACKAGE_SORTS = [
  'recommended',
  'price-asc',
  'price-desc',
  'duration-asc',
  'duration-desc',
] as const;

export type PackageRegion = (typeof PACKAGE_REGIONS)[number];
export type PackageTier = (typeof PACKAGE_TIERS)[number];
export type TravelMode = (typeof TRAVEL_MODES)[number];
export type PackageSort = (typeof PACKAGE_SORTS)[number];
export type Difficulty = 'EASY' | 'MODERATE' | 'CHALLENGING';
export type Meal = 'BREAKFAST' | 'LUNCH' | 'DINNER';
export type DepartureStatus = 'AVAILABLE' | 'FILLING_FAST' | 'SOLD_OUT';

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

export interface Departure {
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

export interface PackageRef {
  id: string;
  slug: string;
  title: string;
}

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
  nextDeparture: Departure | null;
  updatedAt: string;
}

/** A token amount per traveller reserves a seat; the balance is paid at the start of the journey. */
export interface BookingTerms {
  tokenAmount: number;
  /** HTTPS payment page for the token (validated by the API). */
  paymentUrl?: string;
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
  departures: Departure[];
  /** Token booking terms; null when seats are reserved by phone only. */
  booking: BookingTerms | null;
  breadcrumb: CategoryRef[];
  faqs: Faq[];
  seo: SeoMeta;
}

export interface UpcomingDeparture extends Departure {
  package: {
    id: string;
    slug: string;
    title: string;
    durationDays: number;
    durationNights: number;
    startLocation: string;
    endLocation: string;
    travelModes: TravelMode[];
    category: CategoryRef;
  };
}

export interface PackageListParams {
  q?: string;
  category?: string;
  region?: PackageRegion;
  tier?: PackageTier;
  mode?: TravelMode;
  minDays?: number;
  maxDays?: number;
  maxPrice?: number;
  featured?: boolean;
  slugs?: string[];
  sort?: PackageSort;
  page?: number;
  limit?: number;
}
