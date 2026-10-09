import type { PackageRef } from '@/modules/packages/package.types';

/** Resolves package references for testimonials. Implemented by the package repository. */
export interface PackageReferenceReader {
  findRefBySlug(slug: string): Promise<PackageRef | null>;
  findRefsByIds(ids: readonly string[]): Promise<PackageRef[]>;
}
