import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface OgImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * The root app/opengraph-image card. Setting `openGraph` on a page replaces the
 * parent's object, so the inherited image would be lost without this default.
 */
const DEFAULT_OG_IMAGE: OgImage = {
  url: '/opengraph-image',
  alt: `${siteConfig.name}: Adi Kailash and Om Parvat yatra`,
  width: 1200,
  height: 630,
};

export interface PageSeo {
  title: string;
  description: string;
  /** Path of the page, e.g. "/tour-packages". Becomes the canonical URL. */
  path: string;
  keywords?: readonly string[];
  /**
   * Leave empty to use the site-wide card. Routes with their own
   * opengraph-image file (packages, blog posts) override it automatically,
   * because file-based metadata takes priority.
   */
  images?: OgImage[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
  /** Skip the "| Brand" title template (used by the home page). */
  absoluteTitle?: boolean;
}

/**
 * One factory for every page's metadata: title, description, canonical URL,
 * Open Graph and Twitter cards stay consistent across the site.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  images,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
  absoluteTitle = false,
}: PageSeo): Metadata {
  const ogImages = images && images.length > 0 ? images : [DEFAULT_OG_IMAGE];
  const shared = {
    title,
    description,
    url: path,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: ogImages,
  };

  const openGraph: Metadata['openGraph'] =
    type === 'article'
      ? { ...shared, type: 'article', publishedTime, modifiedTime, authors, tags }
      : { ...shared, type: 'website' };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: path },
    openGraph,
    // twitter:image is left unset on purpose: Next.js copies the final Open Graph
    // images (including file-based ones) into the Twitter card.
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
