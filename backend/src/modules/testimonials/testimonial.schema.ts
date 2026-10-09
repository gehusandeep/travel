import { z } from 'zod';
import { booleanQuery, slugSchema } from '@/core/http/query';

export const testimonialListQuerySchema = z.object({
  featured: booleanQuery.optional(),
  /** Package slug */
  package: slugSchema.optional(),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

export type TestimonialListQuery = z.infer<typeof testimonialListQuerySchema>;
