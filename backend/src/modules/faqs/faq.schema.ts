import { z } from 'zod';
import { upperEnum } from '@/core/http/query';
import { FAQ_TOPICS } from './faq.types';

export const faqListQuerySchema = z.object({
  topic: upperEnum(FAQ_TOPICS).optional(),
});
