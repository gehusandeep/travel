/** Domain value types shared by several modules. */

export interface ImageAsset {
  url: string;
  alt: string;
}

/** Optional per-record overrides for page title, description and keywords. */
export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
}
