import { siteConfig } from '@/config/site';

/** Every internal URL is built here, so a route change touches one file. */
export const routes = {
  home: '/',
  packages: '/tour-packages',
  destinations: '/destinations',
  blog: '/blog',
  about: '/about-us',
  contact: '/contact',
  faqs: '/faqs',
  testimonials: '/testimonials',
  search: '/search',
  wishlist: '/wishlist',
  kailashLanding: '/kailash-mansarovar-yatra-2027',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  refunds: '/refund-and-cancellation-policy',
  package: (slug: string) => `/tour-packages/${slug}`,
  category: (path: readonly string[]) => `/destinations/${path.join('/')}`,
  post: (slug: string) => `/blog/${slug}`,
} as const;

export function absoluteUrl(path = '/'): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
