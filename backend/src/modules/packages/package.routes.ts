import { Router } from 'express';
import { cacheFor, noStore } from '@/core/middlewares';
import type { PackageController } from './package.controller';

export function createPackageRouter(controller: PackageController): Router {
  const router = Router();
  router.get('/', cacheFor(60), controller.list);
  router.get('/:slug', cacheFor(60), controller.getBySlug);
  router.get('/:slug/departures', noStore, controller.getDepartures);
  router.get('/:slug/related', cacheFor(60), controller.getRelated);
  return router;
}
