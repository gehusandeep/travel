import type { Departure, Meal } from '@/modules/packages/package.types';

export const MEALS_ALL: Meal[] = ['BREAKFAST', 'LUNCH', 'DINNER'];
export const MEALS_BD: Meal[] = ['BREAKFAST', 'DINNER'];
export const MEALS_BL: Meal[] = ['BREAKFAST', 'LUNCH'];
export const MEALS_B: Meal[] = ['BREAKFAST'];
export const MEALS_D: Meal[] = ['DINNER'];

/** Compact factory for fixed departures (batches). Dates are YYYY-MM-DD. */
export function departure(
  code: string,
  startDate: string,
  endDate: string,
  price: number,
  totalSeats: number,
  bookedSeats: number,
  note?: string,
): Departure {
  return {
    id: `dep-${code.toLowerCase()}`,
    code,
    startDate,
    endDate,
    price,
    totalSeats,
    bookedSeats,
    note,
  };
}
