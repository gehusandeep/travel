/**
 * Turns a params object into flat string values: drops empty values and joins
 * arrays with commas (the API's list format). Shared by the server fetch client
 * and RTK Query so both build identical URLs.
 */
export function normalizeQuery(query: object = {}): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(query) as Array<[string, unknown]>) {
    if (value === undefined || value === null || value === '') continue;

    if (Array.isArray(value)) {
      if (value.length > 0) result[key] = value.map(String).join(',');
      continue;
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      result[key] = String(value);
    }
  }
  return result;
}

export function buildQueryString(query?: object): string {
  const queryString = new URLSearchParams(normalizeQuery(query)).toString();
  return queryString ? `?${queryString}` : '';
}
