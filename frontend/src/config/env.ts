const withoutTrailingSlash = (value: string) => value.replace(/\/+$/, '');

/**
 * Values that are safe to expose to the browser. Next.js inlines NEXT_PUBLIC_*
 * variables at build time, so they must be referenced literally here.
 */
export const publicEnv = {
  siteUrl: withoutTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  apiUrl: withoutTrailingSlash(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'),
} as const;
