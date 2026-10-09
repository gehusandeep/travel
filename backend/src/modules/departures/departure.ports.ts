import type { UpcomingDeparture } from '@/modules/packages/package.types';
import type { UpcomingDeparturesQuery } from './departure.schema';

/**
 * Departures belong to the package aggregate, so the packages module owns the data.
 * This module only exposes it as its own REST resource. Implemented by PackageService.
 */
export interface UpcomingDepartureReader {
  listUpcomingDepartures(query: UpcomingDeparturesQuery): Promise<UpcomingDeparture[]>;
}
