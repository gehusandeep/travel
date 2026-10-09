import { z } from 'zod';

/** Client-side validation. Mirrors backend/src/modules/enquiries/enquiry.schema.ts. */

export const PHONE_PATTERN = /^\+?[0-9][0-9\s-]{6,18}$/;

export const enquiryFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(80, 'Please keep your name under 80 characters'),
  phone: z.string().trim().regex(PHONE_PATTERN, 'Please enter a valid phone number, e.g. +91 98765 43210'),
  email: z.string().trim().max(120, 'This email address is too long').pipe(z.email('Please enter a valid email address')),
  city: z.string().trim().max(80, 'Please keep this under 80 characters'),
  travelMonth: z.string().trim().max(40),
  groupSize: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || (/^\d{1,3}$/.test(value) && Number(value) >= 1 && Number(value) <= 200),
      'Enter a number of travellers between 1 and 200',
    ),
  message: z.string().trim().max(1000, 'Please keep your message under 1,000 characters'),
  /** Honeypot */
  website: z.string(),
});

export type EnquiryFormValues = z.input<typeof enquiryFormSchema>;
export type EnquiryField = keyof EnquiryFormValues;
