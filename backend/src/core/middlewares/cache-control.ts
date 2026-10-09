import type { RequestHandler } from 'express';

/** Lets browsers and CDNs cache public catalogue responses briefly. */
export const cacheFor =
  (seconds: number): RequestHandler =>
  (_req, res, next) => {
    res.set('Cache-Control', `public, max-age=${seconds}, stale-while-revalidate=${seconds * 5}`);
    next();
  };

/** For live or private data (seat availability, admin endpoints). */
export const noStore: RequestHandler = (_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
};
