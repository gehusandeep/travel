import { Router, type RequestHandler } from 'express';
import { noStore } from '@/core/middlewares';
import type { AuthController } from './auth.controller';

export interface AuthRouteDeps {
  loginLimiter: RequestHandler;
  authenticate: RequestHandler;
}

export function createAuthRouter(controller: AuthController, { loginLimiter, authenticate }: AuthRouteDeps): Router {
  const router = Router();
  router.use(noStore);
  router.post('/login', loginLimiter, controller.login);
  router.get('/me', authenticate, controller.me);
  return router;
}
