import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { BlogCard } from '@/features/blog/components/BlogCard';
import { blogService } from '@/features/blog/server/blog.service';
import type { BlogSummary } from '@/features/blog/types';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';
import { emptyPage } from '@/types/api';

export const metadata = buildMetadata({
  title: 'Yatra Guides and Travel Blog',
  description:
    'Practical guides for Kailash Mansarovar, Adi Kailash, Char Dham and Muktinath: routes, permits, packing lists and altitude tips.',
  path: routes.blog,
});

const breadcrumbs = [
  { name: 'Home', path: routes.home },
  { name: 'Blog', path: routes.blog },
];

export default async function BlogPage() {
  const posts = await withFallback(blogService.list({ limit: 24 }), emptyPage<BlogSummary>(), 'blog list');

  return (
    <>
      <PageHeader
        eyebrow="Travel guides"
        title="Yatra guides and travel blog"
        description="Routes, permits, packing lists and health advice from the people who walk these yatras every season."
        breadcrumbs={breadcrumbs}
      />
      <Container className="py-12 sm:py-16">
        {posts.items.length === 0 ? (
          <EmptyState title="New guides are on the way" description="Please check back soon." />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.items.map((post) => (
              <li key={post.id}>
                <BlogCard post={post} headingLevel="h2" />
              </li>
            ))}
          </ul>
        )}
      </Container>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
