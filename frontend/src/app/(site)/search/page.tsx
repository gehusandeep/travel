import { Suspense } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { SearchView } from '@/features/search/components/SearchView';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';

/** Internal search results should not be indexed (thin, duplicate content). */
export const metadata = buildMetadata({
  title: 'Search Packages',
  description: 'Search pilgrimage tour packages by destination, temple or travel mode.',
  path: routes.search,
  noIndex: true,
});

export default function SearchPage() {
  return (
    <>
      <PageHeader
        title="Search packages"
        breadcrumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Search', path: routes.search },
        ]}
      />
      <Container className="py-12 sm:py-16">
        <Suspense fallback={<p className="text-center text-stone-600">Loading search…</p>}>
          <SearchView />
        </Suspense>
      </Container>
    </>
  );
}
