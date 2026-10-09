import { z } from 'zod';

/** Reusable zod building blocks for query strings and route params. */

export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug');

export const slugParamsSchema = z.object({ slug: slugSchema });

export const booleanQuery = z
  .enum(['true', 'false', '1', '0'])
  .transform((value) => value === 'true' || value === '1');

/** Case-insensitive enum, so `?tier=deluxe` and `?tier=DELUXE` both work. */
export const upperEnum = <const T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess(
    (value) => (typeof value === 'string' ? value.trim().toUpperCase() : value),
    z.enum(values),
  );

/** Comma-separated list, e.g. `?slugs=a,b,c`. */
export const csvQuery = (maxItems = 50) =>
  z
    .string()
    .max(2000)
    .transform((value) =>
      value
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean)
        .slice(0, maxItems),
    );
