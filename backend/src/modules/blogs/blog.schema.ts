import { z } from 'zod';
import { paginationQuerySchema } from '@/core/http/pagination';

export const blogListQuerySchema = paginationQuerySchema.extend({
  tag: z.string().trim().max(60).optional(),
});

export type BlogListQuery = z.infer<typeof blogListQuerySchema>;
