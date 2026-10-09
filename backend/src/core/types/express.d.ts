import type { AuthPrincipal } from '@/core/security/types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      /** Set by the `authenticate` middleware for protected routes. */
      user?: AuthPrincipal;
    }
  }
}

export {};
