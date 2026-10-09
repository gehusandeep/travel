import type { Departure, DepartureStatus, DepartureView } from './package.types';

/** A batch counts as "filling fast" once 75% or more of its seats are booked. */
export const FILLING_FAST_RATIO = 0.25;

export function getDepartureStatus(availableSeats: number, totalSeats: number): DepartureStatus {
  if (availableSeats <= 0 || totalSeats <= 0) return 'SOLD_OUT';
  return availableSeats / totalSeats <= FILLING_FAST_RATIO ? 'FILLING_FAST' : 'AVAILABLE';
}

export function toDepartureView(departure: Departure): DepartureView {
  const availableSeats = Math.max(0, departure.totalSeats - departure.bookedSeats);
  return {
    id: departure.id,
    code: departure.code,
    startDate: departure.startDate,
    endDate: departure.endDate,
    price: departure.price,
    totalSeats: departure.totalSeats,
    availableSeats,
    status: getDepartureStatus(availableSeats, departure.totalSeats),
    note: departure.note,
  };
}

/** Departures starting on or after `today`, earliest first. */
export function getUpcomingDepartures(departures: readonly Departure[], today: string): DepartureView[] {
  return departures
    .filter((departure) => departure.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map(toDepartureView);
}

/** Earliest upcoming departure with seats left, falling back to the earliest one. */
export function getNextDeparture(departures: readonly Departure[], today: string): DepartureView | null {
  const upcoming = getUpcomingDepartures(departures, today);
  return upcoming.find((departure) => departure.status !== 'SOLD_OUT') ?? upcoming[0] ?? null;
}
