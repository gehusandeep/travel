import { siteConfig } from '@/config/site';
import { renderOgImage } from '@/lib/seo/og-image';

export const alt = `${siteConfig.name}: Adi Kailash and Om Parvat yatra from Dharchula, Kathgodam and Delhi`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default social sharing card for every page without its own image. */
export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: 'Adi Kailash calls. Om Parvat awaits.',
    title: 'Adi Kailash & Om Parvat Yatra 2026-27',
    subtitle: 'Inner Line Permit help, 4x4 mountain vehicles and pure veg food with a local team in Dharchula.',
    facts: ['From Pithoragarh', 'From Kathgodam', 'From Delhi', 'Batches open'],
  });
}
