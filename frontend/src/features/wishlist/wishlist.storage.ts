import { MAX_WISHLIST_ITEMS } from './wishlist.slice';

const STORAGE_KEY = 'divya-darshan:wishlist';

/** Reads the saved wishlist. Returns [] on the server or if storage is unavailable. */
export function readStoredWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string').slice(0, MAX_WISHLIST_ITEMS)
      : [];
  } catch {
    return [];
  }
}

export function writeStoredWishlist(slugs: readonly string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Storage can be full or disabled (private mode). The wishlist still works for this session.
  }
}
