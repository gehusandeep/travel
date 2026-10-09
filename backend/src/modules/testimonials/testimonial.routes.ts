import { Router } from 'express';
import { cacheFor } from '@/core/middlewares';
import type { TestimonialController } from './testimonial.controller';

export function createTestimonialRouter(controller: TestimonialController): Router {
  const router = Router();
  router.get('/', cacheFor(300), controller.list);
  return router;
}
