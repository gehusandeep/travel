import { Router } from 'express';
import { cacheFor } from '@/core/middlewares';
import type { BlogController } from './blog.controller';

export function createBlogRouter(controller: BlogController): Router {
  const router = Router();
  router.use(cacheFor(300));
  router.get('/', controller.list);
  router.get('/:slug', controller.getBySlug);
  return router;
}
