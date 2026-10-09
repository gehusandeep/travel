import { Router } from 'express';
import type { AppModule } from '@/core/module';

/** Mounts every feature module under its base path. Adding a module never requires editing this file. */
export function createApiRouter(modules: readonly AppModule[]): Router {
  const router = Router();
  for (const { basePath, router: moduleRouter } of modules) {
    router.use(basePath, moduleRouter);
  }
  return router;
}
