import { Suspense } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { categoryService } from '@/features/categories/server/category.service';
import { toCategoryOptions } from '@/features/categories/utils';
import { CtaBanner } from '@/features/marketing/components/CtaBanner';
import { PackageExplorer } from '@/features/packages/components/PackageExplorer';
import { PackageGrid } from '@/features/packages/components/PackageGrid';
import { packageService } from '@/features/packages/server/package.service';
import type { PackageSummary } from '@/features/packages/types';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd, packageListJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';
import { emptyPage } from '@/types/api';

const PAGE_SIZE = 24;

export const metadata = buildMetadata({
  title: 'Adi Kailash and Pilgrimage Tour Packages 2026–27',
  description:
    'Compare Adi Kailash and Om Parvat yatras from Pithoragarh, Kathgodam and Delhi, plus Kailash Mansarovar, Char Dham and Nepal tours. Filter by duration and travel mode.',
  path: routes.packages,
});

const breadcrumbs = [
  { name: 'Home', path: routes.home },
  { name: 'Tour packages', path: routes.packages },
];

export default async function TourPackagesPage() {
  const [initial, tree] = await Promise.all([
    withFallback(packageService.list({ limit: PAGE_SIZE }), emptyPage<PackageSummary>(), 'package list'),
    withFallback(categoryService.getTree(), [], 'category tree'),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="All yatras"
        title="Pilgrimage and tour packages"
        description="Every route we run, with fixed departures, clear inclusions and prices per person. Filter by destination, duration, comfort level or travel mode."
        breadcrumbs={breadcrumbs}
      />
      <Container className="py-12 sm:py-16">
        {/* The fallback is server-rendered, so crawlers and no-JS visitors still get the full list. */}
        <Suspense fallback={<PackageGrid packages={initial.items} />}>
          <PackageExplorer initial={initial} categoryOptions={toCategoryOptions(tree)} pageSize={PAGE_SIZE} />
        </Suspense>
      </Container>
      <CtaBanner title="Cannot find the right yatra?" description="Tell us your dates and group size and we will plan a private departure for you." />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={packageListJsonLd(initial.items, 'Pilgrimage tour packages')} />
    </>
  );
}
