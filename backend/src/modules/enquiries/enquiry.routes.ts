import { Router, type RequestHandler } from 'express';
import { noStore } from '@/core/middlewares';
import type { EnquiryController } from './enquiry.controller';

export interface EnquiryRouteGuards {
  /** Rate limiter for the public form. */
  submitLimiter: RequestHandler;
  /** authenticate + authorize('ADMIN') for the lead inbox. */
  adminGuard: RequestHandler[];
}

export function createEnquiryRouter(
  controller: EnquiryController,
  { submitLimiter, adminGuard }: EnquiryRouteGuards,
): Router {
  const router = Router();
  router.use(noStore);
  router.post('/', submitLimiter, controller.create);
  router.get('/', ...adminGuard, controller.list);
  router.patch('/:id/status', ...adminGuard, controller.updateStatus);
  return router;
}
