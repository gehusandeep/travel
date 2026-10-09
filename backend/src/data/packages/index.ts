import type { TourPackage } from '@/modules/packages/package.types';
import { adiKailashPackages } from './adi-kailash';
import { kailashPackages } from './kailash';
import { nepalPackages } from './nepal';
import { spiritualIndiaPackages } from './spiritual-india';
import { uttarakhandPackages } from './uttarakhand';

/**
 * Full static catalogue. Adi Kailash yatras are the agency's own product line;
 * the other destinations are SAMPLE packages modelled on the reference sites.
 * Swap the repository implementation to load from a database instead.
 */
export const packagesData: TourPackage[] = [
  ...adiKailashPackages,
  ...kailashPackages,
  ...uttarakhandPackages,
  ...nepalPackages,
  ...spiritualIndiaPackages,
];
