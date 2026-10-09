import type { RequestHandler } from 'express';
import { NotFoundError } from '@/core/errors';

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new NotFoundError('Route', `Cannot ${req.method} ${req.path}`));
};
