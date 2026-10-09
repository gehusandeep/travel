export const ENQUIRY_SOURCES = [
  'HERO_FORM',
  'PACKAGE_PAGE',
  'CONTACT_PAGE',
  'PLAN_TRIP',
  'ENQUIRY_MODAL',
  'LANDING_PAGE',
] as const;

export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

/** Body of POST /enquiries. */
export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  city?: string;
  message?: string;
  travelMonth?: string;
  groupSize?: number;
  packageSlug?: string;
  source: EnquirySource;
  pageUrl?: string;
  utm?: UtmParams;
  /** Honeypot. Always empty for real visitors. */
  website?: string;
}

export interface EnquiryReceipt {
  id: string;
  reference: string;
  createdAt: string;
}

/** What the enquiry modal is about (opened from a package card, a departure row, etc.). */
export interface EnquiryContext {
  packageSlug?: string;
  packageTitle?: string;
  source?: EnquirySource;
  /** Pre-filled message, e.g. the batch the visitor clicked. */
  message?: string;
}
