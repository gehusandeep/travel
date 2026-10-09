import { siteConfig } from '@/config/site';
import type { BlogDetail } from '@/features/blog/types';
import type { Faq } from '@/features/faqs/types';
import type { PackageDetail, PackageSummary } from '@/features/packages/types';
import { absoluteUrl, routes } from '@/lib/routes';

/** schema.org builders. Each returns a plain object rendered by <JsonLd />. */

export type JsonLdObject = Record<string, unknown>;

const SCHEMA_CONTEXT = 'https://schema.org';
const organizationId = () => absoluteUrl('/#organization');
const websiteId = () => absoluteUrl('/#website');

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** schema.org expects "+91-..." style numbers. */
const schemaPhone = (href: string) => href.replace('tel:+91', '+91-');

export function organizationJsonLd(): JsonLdObject {
  const { contact, address } = siteConfig;
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'TravelAgency',
    '@id': organizationId(),
    name: siteConfig.legalName,
    alternateName: [siteConfig.shortName, siteConfig.alternateName],
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl('/opengraph-image'),
    description: siteConfig.description,
    telephone: schemaPhone(contact.phoneHref),
    email: contact.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    contactPoint: [contact.phoneHref, contact.altPhoneHref].map((href) => ({
      '@type': 'ContactPoint',
      telephone: schemaPhone(href),
      contactType: 'reservations',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    })),
    areaServed: { '@type': 'AdministrativeArea', name: 'Pithoragarh district, Uttarakhand' },
    sameAs: Object.values(siteConfig.social),
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    '@id': websiteId(),
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: siteConfig.language,
    publisher: { '@id': organizationId() },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl(routes.search)}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: readonly BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function packageListJsonLd(packages: readonly PackageSummary[], name: string): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'ItemList',
    name,
    numberOfItems: packages.length,
    itemListElement: packages.map((pkg, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(routes.package(pkg.slug)),
      name: pkg.title,
    })),
  };
}

const availabilityUrl = (status: PackageDetail['departures'][number]['status']) =>
  ({
    AVAILABLE: 'https://schema.org/InStock',
    FILLING_FAST: 'https://schema.org/LimitedAvailability',
    SOLD_OUT: 'https://schema.org/SoldOut',
  })[status];

export function touristTripJsonLd(pkg: PackageDetail): JsonLdObject {
  const url = absoluteUrl(routes.package(pkg.slug));
  const prices = pkg.departures.map((departure) => departure.price);
  const bookable = pkg.departures.filter((departure) => departure.status !== 'SOLD_OUT');
  // Photos may be site-relative (/images/...) or CDN URLs; schema.org needs absolute URLs.
  const images = [...new Set([pkg.heroImage.url, ...pkg.gallery.map((image) => image.url)])].map((src) =>
    absoluteUrl(src),
  );

  const offers =
    prices.length > 0
      ? {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: Math.min(...prices),
          highPrice: Math.max(...prices),
          offerCount: pkg.departures.length,
          availability: bookable.length > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
          offers: pkg.departures.map((departure) => ({
            '@type': 'Offer',
            name: `${pkg.title}: ${departure.code}`,
            price: departure.price,
            priceCurrency: 'INR',
            availability: availabilityUrl(departure.status),
            validThrough: departure.startDate,
            url,
          })),
        }
      : { '@type': 'Offer', price: pkg.priceFrom, priceCurrency: 'INR', url };

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'TouristTrip',
    '@id': `${url}#trip`,
    name: pkg.title,
    description: pkg.summary,
    url,
    image: images,
    touristType: ['Pilgrims', 'Families', 'Senior travellers'],
    provider: { '@id': organizationId() },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: pkg.stayPlan.length,
      itemListElement: pkg.stayPlan.map((stop, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@type': 'Place', name: stop.place },
      })),
    },
    offers,
  };
}

export function faqPageJsonLd(faqs: readonly Faq[]): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function blogPostingJsonLd(post: BlogDetail): JsonLdObject {
  const url = absoluteUrl(routes.post(post.slug));
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.coverImage.url)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: post.author.name, url: siteConfig.url },
    publisher: { '@id': organizationId() },
    mainEntityOfPage: url,
    keywords: post.tags.join(', '),
    inLanguage: siteConfig.language,
  };
}
