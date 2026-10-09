import { z } from 'zod';

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

/** Result shape every list-style repository method returns. */
export interface Paginated<T> {
  items: T[];
  total: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const buildPaginationMeta = (
  { page, limit }: PaginationQuery,
  total: number,
): PaginationMeta => ({
  page,
  limit,
  total,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});

/** In-memory pagination used by the static repositories. A database repository uses LIMIT/OFFSET instead. */
export function paginateArray<T>(items: readonly T[], { page, limit }: PaginationQuery): Paginated<T> {
  const start = (page - 1) * limit;
  return { items: items.slice(start, start + limit), total: items.length };
}
