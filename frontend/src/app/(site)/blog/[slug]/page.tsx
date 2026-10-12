import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BlogCard } from '@/features/blog/components/BlogCard';
import { BlogContent } from '@/features/blog/components/BlogContent';
import { TableOfContents } from '@/features/blog/components/TableOfContents';
import { blogService } from '@/features/blog/server/blog.service';
import type { BlogDetail, BlogSummary } from '@/features/blog/types';
import { EnquiryButton } from '@/features/enquiry/components/EnquiryButton';
import { PackageGrid } from '@/features/packages/components/PackageGrid';
import { packageService } from '@/features/packages/server/package.service';
import { isNotFoundError } from '@/lib/http/api-error';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';
import { notFoundMetadata } from '@/lib/seo/not-found-metadata';
import { formatDate } from '@/lib/utils/format';
import { emptyPage } from '@/types/api';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/** null when the post does not exist; other API errors propagate to error.tsx. */
async function findPost(slug: string): Promise<BlogDetail | null> {
  try {
    return await blogService.getBySlug(slug);
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}

export async function generateStaticParams() {
  const { items } = await withFallback(blogService.list({ limit: 100 }), emptyPage<BlogSummary>(), 'blog params');
  return items.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) return notFoundMetadata;

  return buildMetadata({
    title: post.seo.title ?? post.title,
    description: post.seo.description ?? post.excerpt,
    path: routes.post(post.slug),
    keywords: post.seo.keywords ?? post.tags,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author.name],
    tags: post.tags,
    images: 'route',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = (await findPost(slug)) ?? notFound();

  const relatedPackages =
    post.relatedPackages.length > 0
      ? await withFallback(
          packageService
            .list({ slugs: post.relatedPackages.map((pkg) => pkg.slug), limit: 6 })
            .then((page) => page.items),
          [],
          'blog related packages',
        )
      : [];

  const breadcrumbs = [
    { name: 'Home', path: routes.home },
    { name: 'Blog', path: routes.blog },
    { name: post.title, path: routes.post(post.slug) },
  ];

  return (
    <>
      <article>
        <PageHeader title={post.title} description={post.excerpt} breadcrumbs={breadcrumbs} image={post.coverImage}>
          <p className="mt-6 text-sm text-white/80">
            By {post.author.name} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{' '}
            {post.readingMinutes} min read
          </p>
        </PageHeader>

        <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-16">
          <div className="min-w-0 max-w-3xl">
            <BlogContent blocks={post.content} />
            <ul aria-label="Tags" className="mt-12 flex flex-wrap gap-2 border-t border-stone-200 pt-6">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="brand">{tag}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <aside aria-label="Article tools" className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <TableOfContents items={post.toc} />
            <div className="rounded-3xl bg-ink-950 p-6 text-white">
              <p className="font-display text-xl font-bold">Need help planning?</p>
              <p className="mt-2 text-sm text-white/80">Talk to a yatra expert about dates, permits and prices.</p>
              <EnquiryButton className="mt-4 w-full">Ask an expert</EnquiryButton>
            </div>
          </aside>
        </Container>
      </article>

      {relatedPackages.length > 0 ? (
        <section className="bg-stone-50 py-16">
          <Container>
            <SectionHeading align="left" eyebrow="Plan this yatra" title="Packages mentioned in this guide" />
            <div className="mt-10">
              <PackageGrid packages={relatedPackages} />
            </div>
          </Container>
        </section>
      ) : null}

      {post.relatedPosts.length > 0 ? (
        <section aria-labelledby="more-guides-heading" className="py-16">
          <Container>
            <h2 id="more-guides-heading" className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">
              More yatra guides
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {post.relatedPosts.map((related) => (
                <li key={related.id}>
                  <BlogCard post={related} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={blogPostingJsonLd(post)} />
    </>
  );
}
