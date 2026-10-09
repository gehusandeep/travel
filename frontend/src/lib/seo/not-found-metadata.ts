import type { Metadata } from 'next';

/**
 * Metadata for a dynamic route whose record does not exist.
 *
 * generateMetadata returns this instead of calling notFound(): with streamed
 * metadata (Next.js 15.2+), a notFound() thrown there produced a 404 response
 * with an empty <body>. The page component still calls notFound(), which
 * renders app/not-found.tsx normally.
 */
export const notFoundMetadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};
