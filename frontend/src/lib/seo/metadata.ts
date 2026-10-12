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

/**
 * - 'site' (default): the site-wide card from app/opengraph-image.
 * - 'route': the route folder has its own opengraph-image file. Next.js only
 *   applies a file-based image when the page's metadata leaves
 *   openGraph.images unset, so buildMetadata omits it.
 * - an array: explicit images.
 */
export type OgImageSource = 'site' | 'route' | OgImage[];

export interface PageSeo {
  title: string;
  description: string;
  /** Path of the page, e.g. "/tour-packages". Becomes the canonical URL. */
  path: string;
  keywords?: readonly string[];
  images?: OgImageSource;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
  /** Skip the "| Brand" title template (used by the home page). */
  absoluteTitle?: boolean;
}

function resolveImages(source: OgImageSource): { images?: OgImage[] } {
  if (source === 'route') return {};
  if (source === 'site' || source.length === 0) return { images: [DEFAULT_OG_IMAGE] };
  return { images: source };
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
  images = 'site',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
  absoluteTitle = false,
}: PageSeo): Metadata {
  const shared = {
    title,
    description,
    url: path,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    ...resolveImages(images),
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
