import { z } from 'zod';
import { slugSchema } from '@/core/http/query';

export const upcomingDeparturesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(10),
  /** Category slug; includes sub-categories. */
  category: slugSchema.optional(),
});

export type UpcomingDeparturesQuery = z.infer<typeof upcomingDeparturesQuerySchema>;
