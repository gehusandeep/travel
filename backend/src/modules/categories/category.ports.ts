/**
 * What the categories module needs from the package catalogue. The consumer owns
 * this interface, so categories never depend on how packages are stored.
 */
export interface PackageCounter {
  /** Number of packages assigned directly to each category id. */
  countByCategory(): Promise<Record<string, number>>;
}
