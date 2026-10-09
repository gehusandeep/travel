import { publicEnv } from './env';

export type SocialNetwork = 'instagram' | 'facebook' | 'youtube' | 'linkedin' | 'x';

export interface Registration {
  /** Body the business is registered with. */
  label: string;
  /** Short description shown when no registration number is available yet. */
  detail: string;
  /** Registration or licence number, shown when provided. */
  number?: string;
}

/**
 * Only networks with a real profile are listed; links, footer icons and the
 * Organization schema `sameAs` are generated from this object.
 */
const social: Partial<Record<SocialNetwork, string>> = {
  instagram: 'https://www.instagram.com/adi_kailash_yatradivya_darshan/',
};

/**
 * Registrations named in the Instagram bio. Add the certificate numbers
 * (Uttarakhand Tourism, Udyam, Ministry of Tourism) before launch.
 */
const registrations: Registration[] = [
  { label: 'Uttarakhand Tourism', detail: 'Registered tour operator' },
  { label: 'MSME (Udyam)', detail: 'Registered enterprise' },
  { label: 'Ministry of Tourism', detail: 'Government of India' },
];

/**
 * Single source of truth for brand and contact details.
 * Sourced from the business's Instagram page (@adi_kailash_yatradivya_darshan)
 * and its public Razorpay booking pages. Still to confirm: office hours and
 * the exact street address.
 */
export const siteConfig = {
  name: 'Divya Darshan Tours',
  shortName: 'Divya Darshan',
  legalName: 'Divya Darshan Tours',
  /** Name used on the Instagram profile. */
  alternateName: 'Adi Kailash Yatra | Divya Darshan',
  tagline: 'Explore the unexplored',
  /** Brand shield, served from /public. */
  logo: '/images/brand/divya-darshan-logo.png',
  description:
    'Adi Kailash and Om Parvat yatras run by a local team in Dharchula, with complete Inner Line Permit help, 4×4 mountain vehicles and pure vegetarian food.',
  url: publicEnv.siteUrl,
  locale: 'en_IN',
  language: 'en-IN',
  contact: {
    phone: '+91 89793 10074',
    phoneHref: 'tel:+918979310074',
    altPhone: '+91 89370 84193',
    altPhoneHref: 'tel:+918937084193',
    whatsapp: '918979310074',
    email: 'divyadarshantour@gmail.com',
    /** PLACEHOLDER: confirm the hours the team answers calls. */
    hours: 'Mon–Sat, 9:00 am – 8:00 pm IST',
  },
  address: {
    street: 'Near Kumaon Scott',
    locality: 'Dharchula',
    district: 'Pithoragarh',
    region: 'Uttarakhand',
    postalCode: '262545',
    country: 'IN',
    countryName: 'India',
  },
  social,
  instagram: {
    handle: '@adi_kailash_yatradivya_darshan',
    url: 'https://www.instagram.com/adi_kailash_yatradivya_darshan/',
  },
  registrations,
  keywords: [
    'adi kailash yatra',
    'om parvat yatra',
    'adi kailash yatra 2026',
    'adi kailash tour package',
    'adi kailash yatra from delhi',
    'adi kailash yatra from kathgodam',
    'adi kailash from pithoragarh',
    'parvati sarovar',
    'inner line permit adi kailash',
    'dharchula tour operator',
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/** "Near Kumaon Scott, Dharchula, Pithoragarh, Uttarakhand 262545" */
export function formatAddress({ withCountry = false } = {}): string {
  const { street, locality, district, region, postalCode, countryName } = siteConfig.address;
  const line = `${street}, ${locality}, ${district}, ${region} ${postalCode}`;
  return withCountry ? `${line}, ${countryName}` : line;
}
