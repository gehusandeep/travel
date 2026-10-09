import type { BadgeVariant } from '@/components/ui/Badge';
import type {
  DepartureStatus,
  Difficulty,
  Meal,
  PackageRegion,
  PackageSort,
  PackageTier,
  TravelMode,
} from './types';

/** Display labels for API enums, kept in one place. */

export const TIER_LABELS: Record<PackageTier, string> = {
  BUDGET: 'Budget',
  STANDARD: 'Standard',
  DELUXE: 'Deluxe',
  PREMIUM: 'Premium',
};

export const MODE_LABELS: Record<TravelMode, string> = {
  ROAD: 'By road',
  FLIGHT: 'Flight',
  HELICOPTER: 'Helicopter',
  TREK: 'Trek',
};

export const REGION_LABELS: Record<PackageRegion, string> = {
  DOMESTIC: 'Within India',
  INTERNATIONAL: 'Nepal and Tibet',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  EASY: 'Easy',
  MODERATE: 'Moderate',
  CHALLENGING: 'Challenging',
};

export const MEAL_LABELS: Record<Meal, string> = {
  BREAKFAST: 'Breakfast',
  LUNCH: 'Lunch',
  DINNER: 'Dinner',
};

export const DEPARTURE_STATUS_LABELS: Record<DepartureStatus, string> = {
  AVAILABLE: 'Available',
  FILLING_FAST: 'Filling fast',
  SOLD_OUT: 'Sold out',
};

export const DEPARTURE_STATUS_BADGES: Record<DepartureStatus, BadgeVariant> = {
  AVAILABLE: 'success',
  FILLING_FAST: 'warning',
  SOLD_OUT: 'danger',
};

export const SORT_LABELS: Record<PackageSort, string> = {
  recommended: 'Recommended',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  'duration-asc': 'Duration: shortest first',
  'duration-desc': 'Duration: longest first',
};
