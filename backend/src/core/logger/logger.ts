import pino from 'pino';
import { APP_NAME } from '@/config/constants';
import { env } from '@/config/env';

const baseOptions = {
  name: APP_NAME,
  level: env.LOG_LEVEL,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'password',
      '*.password',
      '*.passwordHash',
    ],
    censor: '[redacted]',
  },
} satisfies pino.LoggerOptions;

/**
 * pino-pretty is a devDependency, so it is missing from production installs and
 * from serverless bundles. Colourised logs are a local convenience only:
 * anywhere else (Vercel, plain `npm start`) falls back to structured JSON,
 * which is what log collectors want anyway.
 */
function createLogger() {
  const prettyLogsAvailable = env.NODE_ENV === 'development' && !process.env.VERCEL;
  if (!prettyLogsAvailable) return pino(baseOptions);

  try {
    return pino({
      ...baseOptions,
      transport: {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:HH:MM:ss', ignore: 'pid,hostname' },
      },
    });
  } catch {
    // pino-pretty was not installed. Never let log formatting break startup.
    return pino(baseOptions);
  }
}

export const logger = createLogger();

export type AppLogger = typeof logger;
