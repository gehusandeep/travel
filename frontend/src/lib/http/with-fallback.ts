/**
 * Resolves to `fallback` instead of throwing. Use it for optional page sections
 * (testimonials, blog teasers) so one failing request never takes the page down.
 */
export async function withFallback<T>(request: Promise<T>, fallback: T, label = 'API request'): Promise<T> {
  try {
    return await request;
  } catch (error) {
    console.error(`[api] ${label} failed:`, error instanceof Error ? error.message : error);
    return fallback;
  }
}
