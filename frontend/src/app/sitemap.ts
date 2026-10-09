import type { MetadataRoute } from 'next';
import { blogService } from '@/features/blog/server/blog.service';
import type { BlogSummary } from '@/features/blog/types';
import { categoryService } from '@/features/categories/server/category.service';
import { flattenCategoryTree } from '@/features/categories/utils';
import { packageService } from '@/features/packages/server/package.service';
import type { PackageSummary } from '@/features/packages/types';
import { withFallback } from '@/lib/http/with-fallback';
import { absoluteUrl, routes } from '@/lib/routes';
import { emptyPage } from '@/types/api';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: ChangeFrequency }> = [
  { path: routes.home, priority: 1, changeFrequency: 'daily' },
  { path: routes.packages, priority: 0.9, changeFrequency: 'daily' },
  { path: routes.kailashLanding, priority: 0.9, changeFrequency: 'weekly' },
  { path: routes.destinations, priority: 0.8, changeFrequency: 'weekly' },
  { path: routes.blog, priority: 0.7, changeFrequency: 'weekly' },
  { path: routes.contact, priority: 0.6, changeFrequency: 'yearly' },
  { path: routes.about, priority: 0.5, changeFrequency: 'yearly' },
  { path: routes.faqs, priority: 0.5, changeFrequency: 'monthly' },
  { path: routes.testimonials, priority: 0.5, changeFrequency: 'monthly' },
  { path: routes.privacy, priority: 0.2, changeFrequency: 'yearly' },
  { path: routes.terms, priority: 0.2, changeFrequency: 'yearly' },
  { path: routes.refunds, priority: 0.2, changeFrequency: 'yearly' },
];

/** /sitemap.xml generated from the API, refreshed with the same ISR window as the pages. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, tree, posts] = await Promise.all([
    withFallback(packageService.list({ limit: 100 }), emptyPage<PackageSummary>(), 'sitemap packages'),
    withFallback(categoryService.getTree(), [], 'sitemap categories'),
    withFallback(blogService.list({ limit: 100 }), emptyPage<BlogSummary>(), 'sitemap posts'),
  ]);

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      changeFrequency,
      priority,
    })),
    ...flattenCategoryTree(tree).map((category) => ({
      url: absoluteUrl(routes.category(category.path)),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...packages.items.map((pkg) => ({
      url: absoluteUrl(routes.package(pkg.slug)),
      lastModified: pkg.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...posts.items.map((post) => ({
      url: absoluteUrl(routes.post(post.slug)),
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
