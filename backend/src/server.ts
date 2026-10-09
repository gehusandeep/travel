import { API_PREFIX } from '@/config/constants';
import { env } from '@/config/env';
import { logger } from '@/core/logger/logger';
import { createApp } from './app';

const SHUTDOWN_TIMEOUT_MS = 10_000;

const app = createApp();

const server = app.listen(env.PORT, (error?: Error) => {
  if (error) {
    logger.fatal({ err: error }, 'HTTP server failed to start');
    process.exit(1);
  }
  logger.info(`API ready at http://localhost:${env.PORT}${API_PREFIX}`);
});

let shuttingDown = false;

function shutdown(signal: NodeJS.Signals): void {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, 'Shutting down gracefully');

  server.close((error) => {
    if (error) {
      logger.error({ err: error }, 'Error while closing the HTTP server');
      process.exit(1);
    }
    process.exit(0);
  });

  setTimeout(() => {
    logger.warn('Forcing shutdown after timeout');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('unhandledRejection', (reason) => {
  logger.error({ err: reason }, 'Unhandled promise rejection');
});
process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'Uncaught exception');
  process.exit(1);
});
