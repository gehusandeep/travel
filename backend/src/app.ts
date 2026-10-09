import { randomUUID } from 'node:crypto';
import compression from 'compression';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { API_PREFIX, API_VERSION, APP_NAME } from '@/config/constants';
import { env } from '@/config/env';
import { logger } from '@/core/logger/logger';
import { errorHandler, notFoundHandler } from '@/core/middlewares';
import { createApiRouter } from '@/routes';
import { buildContainer, type Container } from './container';

const REQUEST_ID_PATTERN = /^[\w-]{1,100}$/;

/** Express app factory. Accepts a container so tests can inject fakes. */
export function createApp(container: Container = buildContainer()): Express {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', env.TRUST_PROXY);

  app.use(
    pinoHttp({
      logger,
      genReqId: (req, res) => {
        const incoming = req.headers['x-request-id'];
        const id = typeof incoming === 'string' && REQUEST_ID_PATTERN.test(incoming) ? incoming : randomUUID();
        res.setHeader('x-request-id', id);
        return id;
      },
      customLogLevel: (_req, res, error) => {
        if (error || res.statusCode >= 500) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
      },
      autoLogging: { ignore: (req) => req.url === `${API_PREFIX}/health` },
    }),
  );
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGINS,
      methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      maxAge: 600,
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: '20kb' }));

  app.get('/', (_req, res) => {
    res.json({ name: APP_NAME, version: API_VERSION, health: `${API_PREFIX}/health` });
  });
  app.use(API_PREFIX, container.rateLimiters.general, createApiRouter(container.modules));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
