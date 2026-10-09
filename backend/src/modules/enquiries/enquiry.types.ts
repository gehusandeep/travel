import type { PackageRef } from '@/modules/packages/package.types';

export const ENQUIRY_SOURCES = [
  'HERO_FORM',
  'PACKAGE_PAGE',
  'CONTACT_PAGE',
  'PLAN_TRIP',
  'ENQUIRY_MODAL',
  'LANDING_PAGE',
] as const;

export const ENQUIRY_STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'] as const;

export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface EnquiryHistoryEntry {
  at: string;
  status: EnquiryStatus;
  by: string;
  note?: string;
}

/** A sales lead captured from any form on the website. */
export interface Enquiry {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  message?: string;
  travelMonth?: string;
  groupSize?: number;
  package?: PackageRef;
  source: EnquirySource;
  status: EnquiryStatus;
  utm?: UtmParams;
  pageUrl?: string;
  client: { ip?: string; userAgent?: string };
  history: EnquiryHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

/** Returned to the public form. Never echoes personal data back. */
export interface EnquiryReceipt {
  id: string;
  reference: string;
  createdAt: string;
}
