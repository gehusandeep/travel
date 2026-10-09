import { Router } from 'express';
import { API_VERSION, APP_NAME } from '@/config/constants';
import { sendSuccess } from '@/core/http/response';
import { noStore } from '@/core/middlewares';
import type { AppModule } from '@/core/module';

/** Liveness endpoint for uptime monitors and load balancers. */
export function createHealthModule() {
  const router = Router();
  router.get('/', noStore, (_req, res) => {
    sendSuccess(res, {
      status: 'ok',
      service: APP_NAME,
      version: API_VERSION,
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  const appModule: AppModule = { name: 'health', basePath: '/health', router };
  return { module: appModule };
}
