import {
  PACKAGE_REGIONS,
  PACKAGE_SORTS,
  PACKAGE_TIERS,
  TRAVEL_MODES,
  type PackageListParams,
  type PackageRegion,
  type PackageSort,
  type PackageTier,
  type TravelMode,
} from './types';

/**
 * Pure helpers that translate between the catalogue URL (?tier=deluxe&duration=short)
 * and API parameters. Keeping them framework-free makes them easy to unit test.
 */

export const DURATION_OPTIONS = [
  { value: 'short', label: 'Up to 5 days', minDays: undefined, maxDays: 5 },
  { value: 'medium', label: '6 to 9 days', minDays: 6, maxDays: 9 },
  { value: 'long', label: '10 days or more', minDays: 10, maxDays: undefined },
] as const;

export type DurationRange = (typeof DURATION_OPTIONS)[number]['value'];

export interface ExplorerFilters {
  q: string;
  category: string;
  region: PackageRegion | '';
  tier: PackageTier | '';
  mode: TravelMode | '';
  duration: DurationRange | '';
  sort: PackageSort;
  page: number;
}

export const DEFAULT_FILTERS: ExplorerFilters = {
  q: '',
  category: '',
  region: '',
  tier: '',
  mode: '',
  duration: '',
  sort: 'recommended',
  page: 1,
};

interface SearchParamsLike {
  get(name: string): string | null;
}

function pickEnum<T extends string>(values: readonly T[], raw: string | null): T | '' {
  if (!raw) return '';
  const upper = raw.toUpperCase();
  return values.find((value) => value === upper) ?? '';
}

export function parseFilters(params: SearchParamsLike, lockedCategory?: string): ExplorerFilters {
  const page = Number.parseInt(params.get('page') ?? '1', 10);
  const rawSort = params.get('sort');
  const rawDuration = params.get('duration');

  return {
    q: (params.get('q') ?? '').slice(0, 100),
    category: lockedCategory ?? params.get('category') ?? '',
    region: pickEnum(PACKAGE_REGIONS, params.get('region')),
    tier: pickEnum(PACKAGE_TIERS, params.get('tier')),
    mode: pickEnum(TRAVEL_MODES, params.get('mode')),
    duration: DURATION_OPTIONS.find((option) => option.value === rawDuration)?.value ?? '',
    sort: PACKAGE_SORTS.find((sort) => sort === rawSort) ?? 'recommended',
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

export function toSearchString(filters: ExplorerFilters, lockedCategory?: string): string {
  const params = new URLSearchParams();
  if (filters.q) params.set('q', filters.q);
  if (filters.category && !lockedCategory) params.set('category', filters.category);
  if (filters.region) params.set('region', filters.region.toLowerCase());
  if (filters.tier) params.set('tier', filters.tier.toLowerCase());
  if (filters.mode) params.set('mode', filters.mode.toLowerCase());
  if (filters.duration) params.set('duration', filters.duration);
  if (filters.sort !== 'recommended') params.set('sort', filters.sort);
  if (filters.page > 1) params.set('page', String(filters.page));

  const query = params.toString();
  return query ? `?${query}` : '';
}

export function toApiParams(filters: ExplorerFilters, pageSize: number): PackageListParams {
  const duration = DURATION_OPTIONS.find((option) => option.value === filters.duration);
  return {
    q: filters.q || undefined,
    category: filters.category || undefined,
    region: filters.region || undefined,
    tier: filters.tier || undefined,
    mode: filters.mode || undefined,
    minDays: duration?.minDays,
    maxDays: duration?.maxDays,
    sort: filters.sort,
    page: filters.page,
    limit: pageSize,
  };
}

/** True when nothing beyond the (optional) locked category is applied. */
export function isDefaultView(filters: ExplorerFilters, lockedCategory?: string): boolean {
  return (
    !filters.q &&
    (Boolean(lockedCategory) || !filters.category) &&
    !filters.region &&
    !filters.tier &&
    !filters.mode &&
    !filters.duration &&
    filters.sort === 'recommended' &&
    filters.page === 1
  );
}

export function countActiveFilters(filters: ExplorerFilters, lockedCategory?: string): number {
  return [
    filters.q,
    lockedCategory ? '' : filters.category,
    filters.region,
    filters.tier,
    filters.mode,
    filters.duration,
  ].filter(Boolean).length;
}
