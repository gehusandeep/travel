import type { PackageRef } from '@/modules/packages/package.types';

/** Resolves the package an enquiry is about. Implemented by the package repository. */
export interface PackageLookup {
  findRefBySlug(slug: string): Promise<PackageRef | null>;
}
