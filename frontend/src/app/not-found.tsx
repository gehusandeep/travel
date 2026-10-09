import { Compass } from 'lucide-react';
import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { categoryService } from '@/features/categories/server/category.service';
import { PackageGrid } from '@/features/packages/components/PackageGrid';
import { packageService } from '@/features/packages/server/package.service';
import type { PackageSummary } from '@/features/packages/types';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { emptyPage } from '@/types/api';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/** Root 404. Renders its own header and footer because it replaces the route-group layouts. */
export default async function NotFound() {
  const [categories, featured] = await Promise.all([
    withFallback(categoryService.getTree(), [], 'category tree'),
    withFallback(packageService.list({ featured: true, limit: 3 }), emptyPage<PackageSummary>(), 'featured packages'),
  ]);

  return (
    <>
      <SkipLink />
      <SiteHeader categories={categories} />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Container className="py-20 text-center sm:py-28">
          <Compass aria-hidden="true" className="mx-auto h-12 w-12 text-brand-700" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-700">Error 404</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-5xl">This path leads nowhere</h1>
          <p className="mx-auto mt-4 max-w-xl text-stone-600">
            The page you are looking for has moved or no longer exists. Let us guide you back to your yatra.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={routes.home}>Go to home page</Button>
            <Button href={routes.packages} variant="outline">
              Browse packages
            </Button>
            <Button href={routes.search} variant="ghost">
              Search
            </Button>
          </div>
        </Container>

        {featured.items.length > 0 ? (
          <section aria-labelledby="popular-heading" className="bg-stone-50 py-16">
            <Container>
              <h2 id="popular-heading" className="font-display text-2xl font-bold text-ink-950">
                Popular yatras
              </h2>
              <div className="mt-8">
                <PackageGrid packages={featured.items} />
              </div>
            </Container>
          </section>
        ) : null}
      </main>
      <SiteFooter categories={categories} />
    </>
  );
}
