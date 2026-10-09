import { randomBytes } from 'node:crypto';
import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

loadDotenv();

const emptyToUndefined = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? undefined : value;

const csv = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  CORS_ORIGINS: z.string().default('http://localhost:3000').transform(csv),
  TRUST_PROXY: z.coerce.number().int().min(0).default(0),
  JWT_SECRET: z.preprocess(
    emptyToUndefined,
    z.string().min(32, 'must be at least 32 characters').optional(),
  ),
  JWT_EXPIRES_IN: z
    .string()
    .regex(/^\d+[smhdw]?$/, 'use a value like 3600, 30m, 12h or 1d')
    .default('1d'),
  ADMIN_NAME: z.string().trim().min(1).default('Site Admin'),
  ADMIN_EMAIL: z.preprocess(emptyToUndefined, z.email().optional()),
  ADMIN_PASSWORD_HASH: z.preprocess(
    emptyToUndefined,
    z.string().startsWith('$2', 'must be a bcrypt hash').optional(),
  ),
  ENQUIRY_STORE_FILE: z.string().default('storage/enquiries.json'),
  RATE_LIMIT_ALLOWLIST: z.string().default('127.0.0.1,::1,::ffff:127.0.0.1').transform(csv),
});

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(`Invalid environment configuration:\n${z.prettifyError(parsed.error)}`);
    process.exit(1);
  }

  const values = parsed.data;

  if (!values.JWT_SECRET) {
    if (values.NODE_ENV === 'production') {
      console.error('JWT_SECRET is required in production.');
      process.exit(1);
    }
    console.warn(
      'JWT_SECRET is not set. Using a random development secret, so admin tokens reset on every restart.',
    );
  }

  return Object.freeze({
    ...values,
    JWT_SECRET: values.JWT_SECRET ?? randomBytes(48).toString('hex'),
    isProduction: values.NODE_ENV === 'production',
  });
}

/** Validated, immutable runtime configuration. Import this instead of reading process.env. */
export const env = loadEnv();
export type Env = typeof env;
