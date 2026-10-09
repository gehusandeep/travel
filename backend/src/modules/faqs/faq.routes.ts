import { Router } from 'express';
import { cacheFor } from '@/core/middlewares';
import type { FaqController } from './faq.controller';

export function createFaqRouter(controller: FaqController): Router {
  const router = Router();
  router.get('/', cacheFor(300), controller.list);
  return router;
}
