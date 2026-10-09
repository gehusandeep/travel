import { routes } from '@/lib/routes';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup extends NavLink {
  description?: string;
  children: NavLink[];
}

/** The agency's main product line, linked from the header and footer. */
export const adiKailashHref = routes.category(['uttarakhand', 'adi-kailash-yatra']);

/** Links shown next to the "Destinations" mega menu. */
export const mainNavLinks: NavLink[] = [
  { label: 'Adi Kailash', href: adiKailashHref },
  { label: 'Tour Packages', href: routes.packages },
  { label: 'Kailash 2027', href: routes.kailashLanding },
  { label: 'Blog', href: routes.blog },
  { label: 'About', href: routes.about },
  { label: 'Contact', href: routes.contact },
];

export const companyLinks: NavLink[] = [
  { label: 'About us', href: routes.about },
  { label: 'Testimonials', href: routes.testimonials },
  { label: 'Travel blog', href: routes.blog },
  { label: 'FAQs', href: routes.faqs },
  { label: 'Contact us', href: routes.contact },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy policy', href: routes.privacy },
  { label: 'Terms and conditions', href: routes.terms },
  { label: 'Refund and cancellation', href: routes.refunds },
];

/** Used when the category API is unavailable, so navigation never breaks. */
export const fallbackDestinationGroups: NavGroup[] = [
  {
    label: 'Uttarakhand Tours',
    href: routes.category(['uttarakhand']),
    children: [
      { label: 'Adi Kailash & Om Parvat', href: adiKailashHref },
      { label: 'Char Dham Yatra', href: routes.category(['uttarakhand', 'char-dham-yatra']) },
    ],
  },
  {
    label: 'Kailash Mansarovar Yatra',
    href: routes.category(['kailash-mansarovar-yatra']),
    children: [],
  },
  {
    label: 'Nepal Spiritual Tours',
    href: routes.category(['nepal-tours']),
    children: [{ label: 'Muktinath Dham', href: routes.category(['nepal-tours', 'muktinath-yatra']) }],
  },
];
