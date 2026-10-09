import { Router } from 'express';
import { cacheFor } from '@/core/middlewares';
import type { DepartureController } from './departure.controller';

export function createDepartureRouter(controller: DepartureController): Router {
  const router = Router();
  router.get('/upcoming', cacheFor(30), controller.listUpcoming);
  return router;
}
