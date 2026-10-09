import { blogService } from '@/features/blog/server/blog.service';
import type { BlogSummary } from '@/features/blog/types';
import { withFallback } from '@/lib/http/with-fallback';
import { renderOgImage } from '@/lib/seo/og-image';
import { emptyPage } from '@/types/api';

export const alt = 'Yatra travel guide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface ImageProps {
  // Next.js 15 passes a plain object; later versions pass a Promise. Awaiting works for both.
  params: Promise<{ slug: string }> | { slug: string };
}

/** Pre-renders a card for every post at build time. */
export async function generateStaticParams() {
  const { items } = await withFallback(blogService.list({ limit: 50 }), emptyPage<BlogSummary>(), 'og params');
  return items.map((post) => ({ slug: post.slug }));
}

export default async function BlogOgImage({ params }: ImageProps) {
  const { slug } = await params;

  try {
    const post = await blogService.getBySlug(slug);
    return await renderOgImage({
      eyebrow: 'Yatra guide',
      title: post.title,
      subtitle: post.excerpt,
      facts: [`${post.readingMinutes} min read`, ...post.tags.slice(0, 2)],
    });
  } catch {
    return renderOgImage({ eyebrow: 'Yatra guide', title: 'Travel guides for Himalayan pilgrimages' });
  }
}
