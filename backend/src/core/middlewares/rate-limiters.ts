import { rateLimit, type Options, type RateLimitRequestHandler } from 'express-rate-limit';
import { TooManyRequestsError } from '@/core/errors';

export interface RateLimiters {
  /** Broad limit for every API call. Allowlisted IPs (e.g. the Next.js server) skip it. */
  general: RateLimitRequestHandler;
  /** Strict limit for public lead forms to stop spam bursts. */
  enquiry: RateLimitRequestHandler;
  /** Brute-force protection for the admin login. */
  login: RateLimitRequestHandler;
}

export function createRateLimiters(allowlist: readonly string[]): RateLimiters {
  const shared: Partial<Options> = {
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, _res, next, options) => next(new TooManyRequestsError(String(options.message))),
  };

  return {
    general: rateLimit({
      ...shared,
      windowMs: 5 * 60 * 1000,
      limit: 600,
      skip: (req) => allowlist.includes(req.ip ?? ''),
      message: 'Too many requests. Please slow down and try again shortly.',
    }),
    enquiry: rateLimit({
      ...shared,
      windowMs: 10 * 60 * 1000,
      limit: 5,
      message:
        'You have already sent several enquiries. Please call us or try again in a few minutes.',
    }),
    login: rateLimit({
      ...shared,
      windowMs: 15 * 60 * 1000,
      limit: 10,
      skipSuccessfulRequests: true,
      message: 'Too many login attempts. Please try again later.',
    }),
  };
}
