import type { Request, RequestHandler } from 'express';
import { UnauthorizedError } from '@/core/errors';
import type { TokenService } from '@/core/security/token.service';
import type { AuthPrincipal } from '@/core/security/types';

/** Verifies the `Authorization: Bearer <token>` header and sets `req.user`. */
export function createAuthenticate(tokens: TokenService): RequestHandler {
  return (req, _res, next) => {
    const [scheme, token] = req.get('authorization')?.split(' ') ?? [];

    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      next(new UnauthorizedError());
      return;
    }

    const principal = tokens.verify(token);
    if (!principal) {
      next(new UnauthorizedError('Invalid or expired token'));
      return;
    }

    req.user = principal;
    next();
  };
}

/** Typed accessor for controllers behind `authenticate`. */
export function getAuthUser(req: Request): AuthPrincipal {
  if (!req.user) throw new UnauthorizedError();
  return req.user;
}
