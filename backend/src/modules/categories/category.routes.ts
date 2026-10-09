import { Router } from 'express';
import { cacheFor } from '@/core/middlewares';
import type { CategoryController } from './category.controller';

export function createCategoryRouter(controller: CategoryController): Router {
  const router = Router();
  router.use(cacheFor(60));
  router.get('/', controller.getTree);
  router.get('/:slug', controller.getBySlug);
  return router;
}
