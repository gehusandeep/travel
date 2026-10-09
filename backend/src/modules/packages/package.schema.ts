import { z } from 'zod';
import { paginationQuerySchema } from '@/core/http/pagination';
import { booleanQuery, csvQuery, slugSchema, upperEnum } from '@/core/http/query';
import { PACKAGE_REGIONS, PACKAGE_SORTS, PACKAGE_TIERS, TRAVEL_MODES } from './package.types';

export const packageListQuerySchema = paginationQuerySchema.extend({
  q: z.string().trim().max(100).optional(),
  /** Category slug. Includes packages from all sub-categories. */
  category: slugSchema.optional(),
  region: upperEnum(PACKAGE_REGIONS).optional(),
  tier: upperEnum(PACKAGE_TIERS).optional(),
  mode: upperEnum(TRAVEL_MODES).optional(),
  minDays: z.coerce.number().int().min(1).max(60).optional(),
  maxDays: z.coerce.number().int().min(1).max(60).optional(),
  maxPrice: z.coerce.number().int().positive().optional(),
  featured: booleanQuery.optional(),
  /** Comma-separated slugs, used by the wishlist. */
  slugs: csvQuery(50).optional(),
  sort: z.enum(PACKAGE_SORTS).default('recommended'),
});

export type PackageListQuery = z.infer<typeof packageListQuerySchema>;

export const relatedPackagesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(12).default(3),
});
