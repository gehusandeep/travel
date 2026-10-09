import type { PackageRef } from '@/modules/packages/package.types';

/** Resolves the packages a post links to. Implemented by the package repository. */
export interface RelatedPackageReader {
  findRefsByIds(ids: readonly string[]): Promise<PackageRef[]>;
}
