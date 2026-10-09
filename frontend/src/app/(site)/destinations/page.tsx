import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { CategoryGrid } from '@/features/categories/components/CategoryGrid';
import { categoryService } from '@/features/categories/server/category.service';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';
import { pluralize } from '@/lib/utils/format';

export const metadata = buildMetadata({
  title: 'Pilgrimage Destinations',
  description:
    'Explore Kailash Mansarovar, Adi Kailash and Om Parvat, the Char Dham, Muktinath, Nepal and the temple towns of India, with every route and departure.',
  path: routes.destinations,
});

const breadcrumbs = [
  { name: 'Home', path: routes.home },
  { name: 'Destinations', path: routes.destinations },
];

export default async function DestinationsPage() {
  const tree = await withFallback(categoryService.getTree(), [], 'destinations');

  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title="Pilgrimage destinations"
        description="Himalayan yatras in India, Nepal and Tibet, and the great temple towns of the Ganga plains."
        breadcrumbs={breadcrumbs}
      />
      <Container className="space-y-16 py-12 sm:py-16">
        {tree.length === 0 ? (
          <EmptyState
            title="Destinations are being updated"
            description="Please check back shortly, or call us to plan your yatra."
          />
        ) : (
          tree.map((node) => (
            <section key={node.id} aria-labelledby={`destination-${node.slug}`}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 id={`destination-${node.slug}`} className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">
                    {node.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-stone-600">{node.shortDescription}</p>
                </div>
                <Button href={routes.category(node.path)} variant="outline" size="sm">
                  View {pluralize(node.packageCount, 'package')}
                </Button>
              </div>
              <CategoryGrid
                categories={node.children.length > 0 ? node.children : [node]}
                className="mt-6 lg:grid-cols-3"
              />
            </section>
          ))
        )}
      </Container>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
