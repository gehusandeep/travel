import pino from 'pino';
import { APP_NAME } from '@/config/constants';
import { env } from '@/config/env';

const usePrettyLogs = env.NODE_ENV === 'development';

export const logger = pino({
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
  ...(usePrettyLogs
    ? {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'SYS:HH:MM:ss', ignore: 'pid,hostname' },
        },
      }
    : {}),
});

export type AppLogger = typeof logger;
