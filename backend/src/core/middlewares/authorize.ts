import type { RequestHandler } from 'express';
import { ForbiddenError, UnauthorizedError } from '@/core/errors';
import type { Role } from '@/core/security/types';

/** Allows the request only when `req.user` has one of the given roles. Use after `authenticate`. */
export const authorize =
  (...roles: Role[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }
    if (roles.length > 0 && !roles.includes(req.user.role)) {
      next(new ForbiddenError());
      return;
    }
    next();
  };
