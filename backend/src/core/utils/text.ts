/** Lower-cases and strips accents so searches match "Mansarovar" and "mānsarovar" alike. */
export const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const slugify = (value: string): string =>
  normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const countWords = (value: string): number =>
  value.trim().split(/\s+/).filter(Boolean).length;

/** True when every search term appears somewhere in the given fields. */
export function matchesSearch(query: string, fields: readonly string[]): boolean {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalizeText(fields.join(' '));
  return terms.every((term) => haystack.includes(term));
}
