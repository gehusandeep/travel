import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Suspense } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { CategoryGrid } from '@/features/categories/components/CategoryGrid';
import { categoryService } from '@/features/categories/server/category.service';
import type { CategoryDetail } from '@/features/categories/types';
import { flattenCategoryTree } from '@/features/categories/utils';
import { CtaBanner } from '@/features/marketing/components/CtaBanner';
import { PackageExplorer } from '@/features/packages/components/PackageExplorer';
import { PackageGrid } from '@/features/packages/components/PackageGrid';
import { packageService } from '@/features/packages/server/package.service';
import type { PackageSummary } from '@/features/packages/types';
import { isNotFoundError } from '@/lib/http/api-error';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd, packageListJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';
import { notFoundMetadata } from '@/lib/seo/not-found-metadata';
import { pluralize } from '@/lib/utils/format';
import { emptyPage } from '@/types/api';

const PAGE_SIZE = 48;

interface CategoryPageProps {
  /** Nested path, e.g. ['uttarakhand', 'adi-kailash-yatra']. The last segment identifies the category. */
  params: Promise<{ slug: string[] }>;
}

/** null when the category does not exist; other API errors propagate to error.tsx. */
async function findCategory(path: readonly string[]): Promise<CategoryDetail | null> {
  const slug = path[path.length - 1];
  if (!slug) return null;

  try {
    return await categoryService.getBySlug(slug);
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}

export async function generateStaticParams() {
  const tree = await withFallback(categoryService.getTree(), [], 'category params');
  return flattenCategoryTree(tree).map((category) => ({ slug: category.path }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = await findCategory(slug);
  if (!detail) return notFoundMetadata;
  const { category } = detail;

  return buildMetadata({
    title: category.seo.title ?? `${category.name} Tour Packages`,
    description: category.seo.description ?? category.shortDescription,
    path: routes.category(category.path),
    keywords: category.seo.keywords,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { category, ancestors, children } = (await findCategory(slug)) ?? notFound();

  // One canonical URL per category: /destinations/adi-kailash-yatra → /destinations/uttarakhand/adi-kailash-yatra
  if (category.path.join('/') !== slug.join('/')) {
    permanentRedirect(routes.category(category.path));
  }

  const packages = await withFallback(
    packageService.list({ category: category.slug, limit: PAGE_SIZE }),
    emptyPage<PackageSummary>(),
    'category packages',
  );

  const breadcrumbs = [
    { name: 'Home', path: routes.home },
    { name: 'Destinations', path: routes.destinations },
    ...ancestors.map((ancestor) => ({ name: ancestor.name, path: routes.category(ancestor.path) })),
    { name: category.name, path: routes.category(category.path) },
  ];

  return (
    <>
      <PageHeader
        eyebrow={pluralize(category.packageCount, 'package')}
        title={category.name}
        description={category.description}
        breadcrumbs={breadcrumbs}
        image={category.image}
      />

      {children.length > 0 ? (
        <section aria-labelledby="subcategories-heading" className="border-b border-stone-200 py-12">
          <Container>
            <h2 id="subcategories-heading" className="font-display text-2xl font-bold text-ink-950">
              Explore {category.name}
            </h2>
            <CategoryGrid categories={children} className="mt-6 lg:grid-cols-3" />
          </Container>
        </section>
      ) : null}

      <Container className="py-12 sm:py-16">
        <Suspense fallback={<PackageGrid packages={packages.items} />}>
          <PackageExplorer
            initial={packages}
            categoryOptions={[]}
            lockedCategory={category.slug}
            pageSize={PAGE_SIZE}
          />
        </Suspense>
      </Container>

      <CtaBanner
        title={`Planning a ${category.name} trip?`}
        description="Tell us your dates and group size and a destination specialist will suggest the right route."
      />

      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={packageListJsonLd(packages.items, `${category.name} packages`)} />
    </>
  );
}
