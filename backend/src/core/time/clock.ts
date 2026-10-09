/** Injectable time source, so date-based rules (e.g. "upcoming departures") stay testable. */
export interface Clock {
  now(): Date;
  /** Current date as `YYYY-MM-DD` (UTC). */
  today(): string;
}

export const systemClock: Clock = {
  now: () => new Date(),
  today: () => new Date().toISOString().slice(0, 10),
};
