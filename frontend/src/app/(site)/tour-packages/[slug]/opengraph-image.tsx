import { packageService } from '@/features/packages/server/package.service';
import type { PackageSummary } from '@/features/packages/types';
import { withFallback } from '@/lib/http/with-fallback';
import { renderOgImage } from '@/lib/seo/og-image';
import { formatDuration, formatIndianNumber } from '@/lib/utils/format';
import { emptyPage } from '@/types/api';

export const alt = 'Tour package overview: route, duration and starting price';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface ImageProps {
  // Next.js 15 passes a plain object; later versions pass a Promise. Awaiting works for both.
  params: Promise<{ slug: string }> | { slug: string };
}

/** Pre-renders a card for every package at build time. */
export async function generateStaticParams() {
  const { items } = await withFallback(packageService.list({ limit: 100 }), emptyPage<PackageSummary>(), 'og params');
  return items.map((pkg) => ({ slug: pkg.slug }));
}

/** Per-package sharing card (WhatsApp, Facebook, X). */
export default async function PackageOgImage({ params }: ImageProps) {
  const { slug } = await params;

  try {
    const pkg = await packageService.getBySlug(slug);
    return await renderOgImage({
      eyebrow: pkg.category.name,
      title: pkg.title,
      subtitle: pkg.subtitle,
      facts: [
        formatDuration(pkg.durationDays, pkg.durationNights),
        `From INR ${formatIndianNumber(pkg.priceFrom)}`,
        `Starts in ${pkg.startLocation}`,
      ],
    });
  } catch {
    return renderOgImage({
      title: 'Adi Kailash and Himalayan yatra packages',
      subtitle: 'Inner Line Permit help, 4x4 mountain vehicles and a local team in Dharchula.',
    });
  }
}
