import { z } from 'zod';
import { paginationQuerySchema } from '@/core/http/pagination';
import { slugSchema, upperEnum } from '@/core/http/query';
import { ENQUIRY_SOURCES, ENQUIRY_STATUSES } from './enquiry.types';

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);

export const createEnquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(80),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(120)
    .pipe(z.email('Please enter a valid email address')),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s-]{6,18}$/, 'Please enter a valid phone number')
    .transform((value) => value.replace(/[\s-]/g, '')),
  city: optionalText(80),
  message: optionalText(1000),
  travelMonth: optionalText(40),
  groupSize: z.coerce.number().int().min(1).max(200).optional(),
  packageSlug: slugSchema.optional(),
  source: z.enum(ENQUIRY_SOURCES).default('ENQUIRY_MODAL'),
  pageUrl: z.url().max(1000).optional(),
  utm: z
    .object({
      source: optionalText(100),
      medium: optionalText(100),
      campaign: optionalText(150),
      term: optionalText(150),
      content: optionalText(150),
    })
    .optional(),
  /** Honeypot. Hidden from real users, so any value means a bot filled the form. */
  website: z.string().max(200).optional(),
});

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;

export const enquiryListQuerySchema = paginationQuerySchema.extend({
  status: upperEnum(ENQUIRY_STATUSES).optional(),
  q: z.string().trim().max(100).optional(),
});

export type EnquiryListQuery = z.infer<typeof enquiryListQuerySchema>;

export const enquiryIdParamsSchema = z.object({ id: z.uuid() });

export const updateEnquiryStatusSchema = z.object({
  status: upperEnum(ENQUIRY_STATUSES),
  note: z.string().trim().max(500).optional(),
});

export type UpdateEnquiryStatusInput = z.infer<typeof updateEnquiryStatusSchema>;
