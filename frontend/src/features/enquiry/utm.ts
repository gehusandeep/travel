import type { UtmParams } from './types';

const STORAGE_KEY = 'himalaya-yatra:utm';
const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;
const MAX_LENGTH = 150;

/**
 * Remembers the campaign tags from the landing URL (e.g. Google Ads), so they are
 * attached to the enquiry even if the visitor browses a few pages first.
 */
export function captureUtmParams(search: string): void {
  const params = new URLSearchParams(search);
  const utm: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(`utm_${key}`);
    if (value) utm[key] = value.slice(0, MAX_LENGTH);
  }
  if (Object.keys(utm).length === 0) return;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // Session storage unavailable: attribution is skipped for this visit.
  }
}

export function getStoredUtm(): UtmParams | undefined {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return undefined;

    const utm: UtmParams = {};
    for (const key of UTM_KEYS) {
      const value = (parsed as Record<string, unknown>)[key];
      if (typeof value === 'string' && value) utm[key] = value.slice(0, MAX_LENGTH);
    }
    return Object.keys(utm).length > 0 ? utm : undefined;
  } catch {
    return undefined;
  }
}
