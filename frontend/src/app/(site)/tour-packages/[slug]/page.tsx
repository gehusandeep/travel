import { Backpack, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InPageNav } from '@/components/layout/InPageNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqList } from '@/features/faqs/components/FaqList';
import { BookingCard } from '@/features/packages/components/BookingCard';
import { InclusionList } from '@/features/packages/components/InclusionList';
import { ItineraryList } from '@/features/packages/components/ItineraryList';
import { LiveDepartureTable } from '@/features/packages/components/LiveDepartureTable';
import { MobileBookingBar } from '@/features/packages/components/MobileBookingBar';
import { PackageGallery } from '@/features/packages/components/PackageGallery';
import { PackageGrid } from '@/features/packages/components/PackageGrid';
import { QuickFacts } from '@/features/packages/components/QuickFacts';
import { StayPlan } from '@/features/packages/components/StayPlan';
import { DIFFICULTY_LABELS, TIER_LABELS } from '@/features/packages/package-labels';
import { packageService } from '@/features/packages/server/package.service';
import type { PackageDetail, PackageSummary } from '@/features/packages/types';
import { WishlistButton } from '@/features/wishlist/components/WishlistButton';
import { isNotFoundError } from '@/lib/http/api-error';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd, faqPageJsonLd, touristTripJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';
import { notFoundMetadata } from '@/lib/seo/not-found-metadata';
import { formatDuration, formatPrice } from '@/lib/utils/format';
import { emptyPage } from '@/types/api';

interface PackagePageProps {
  params: Promise<{ slug: string }>;
}

const sectionTitleClasses = 'font-display text-2xl font-bold text-ink-950 sm:text-3xl';

/** null when the package does not exist; other API errors propagate to error.tsx. */
async function findPackage(slug: string): Promise<PackageDetail | null> {
  try {
    return await packageService.getBySlug(slug);
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}

/** Pre-renders every package at build time; new packages render on first request (ISR). */
export async function generateStaticParams() {
  const { items } = await withFallback(packageService.list({ limit: 100 }), emptyPage<PackageSummary>(), 'package params');
  return items.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await findPackage(slug);
  if (!pkg) return notFoundMetadata;

  return buildMetadata({
    title: pkg.seo.title ?? pkg.title,
    description: pkg.seo.description ?? pkg.summary,
    path: routes.package(pkg.slug),
    keywords: pkg.seo.keywords,
  });
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { slug } = await params;
  const pkg = (await findPackage(slug)) ?? notFound();
  const related = await withFallback(packageService.getRelated(pkg.slug, 3), [], 'related packages');

  const breadcrumbs = [
    { name: 'Home', path: routes.home },
    { name: 'Tour packages', path: routes.packages },
    ...pkg.breadcrumb.map((category) => ({ name: category.name, path: routes.category(category.path) })),
    { name: pkg.title, path: routes.package(pkg.slug) },
  ];

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'dates', label: 'Dates and prices' },
    { id: 'inclusions', label: 'Inclusions' },
    ...(pkg.faqs.length > 0 ? [{ id: 'faqs', label: 'FAQs' }] : []),
  ];

  return (
    <div className="pb-24 lg:pb-0">
      <PageHeader
        eyebrow={pkg.category.name}
        title={pkg.title}
        description={pkg.subtitle}
        breadcrumbs={breadcrumbs}
        image={pkg.heroImage}
      >
        <ul className="mt-6 flex flex-wrap gap-2">
          <li>
            <Badge variant="light">{formatDuration(pkg.durationDays, pkg.durationNights)}</Badge>
          </li>
          <li>
            <Badge variant="light">{TIER_LABELS[pkg.tier]}</Badge>
          </li>
          <li>
            <Badge variant="light">{DIFFICULTY_LABELS[pkg.difficulty]}</Badge>
          </li>
          {pkg.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="dark">{tag}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="text-white/85">
            From <span className="text-2xl font-bold text-white">{formatPrice(pkg.priceFrom)}</span>{' '}
            <span className="text-sm">{pkg.priceNote}</span>
          </p>
          <WishlistButton slug={pkg.slug} title={pkg.title} />
        </div>
      </PageHeader>

      <InPageNav sections={sections} label="Package sections" />

      <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:py-16">
        <div className="min-w-0 space-y-16">
          <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-36">
            <h2 id="overview-heading" className={sectionTitleClasses}>
              Overview
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-stone-700">
              {pkg.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <QuickFacts pkg={pkg} />
            </div>

            <h3 className="mt-10 text-lg font-semibold text-ink-950">Highlights</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {pkg.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-stone-700">
                  <Sparkles aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  {highlight}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-lg font-semibold text-ink-950">Stay plan</h3>
            <StayPlan stops={pkg.stayPlan} className="mt-4" />
            <p className="mt-6 rounded-2xl bg-gold-50 p-4 text-sm text-ink-900">
              <strong>Best for:</strong> {pkg.bestFor}
            </p>

            <div className="mt-8">
              <PackageGallery images={pkg.gallery} />
            </div>
          </section>

          <section id="itinerary" aria-labelledby="itinerary-heading" className="scroll-mt-36">
            <h2 id="itinerary-heading" className={sectionTitleClasses}>
              Day-wise itinerary
            </h2>
            <div className="mt-6">
              <ItineraryList days={pkg.itinerary} />
            </div>
          </section>

          <section id="dates" aria-labelledby="dates-heading" className="scroll-mt-36">
            <h2 id="dates-heading" className={sectionTitleClasses}>
              Departure dates and prices
            </h2>
            <p className="mt-2 text-stone-600">Fixed group departures. Prices are {pkg.priceNote}.</p>
            <div className="mt-6">
              <LiveDepartureTable slug={pkg.slug} packageTitle={pkg.title} initialDepartures={pkg.departures} />
            </div>
          </section>

          <section id="inclusions" aria-labelledby="inclusions-heading" className="scroll-mt-36">
            <h2 id="inclusions-heading" className={sectionTitleClasses}>
              Inclusions and exclusions
            </h2>
            <div className="mt-6">
              <InclusionList inclusions={pkg.inclusions} exclusions={pkg.exclusions} />
            </div>
            <h3 className="mt-10 text-lg font-semibold text-ink-950">Things to carry</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {pkg.thingsToCarry.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-stone-700">
                  <Backpack aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {pkg.faqs.length > 0 ? (
            <section id="faqs" aria-labelledby="faqs-heading" className="scroll-mt-36">
              <h2 id="faqs-heading" className={sectionTitleClasses}>
                Frequently asked questions
              </h2>
              <FaqList faqs={pkg.faqs} className="mt-6" />
            </section>
          ) : null}
        </div>

        <aside aria-label="Book this yatra">
          <BookingCard pkg={pkg} />
        </aside>
      </Container>

      {related.length > 0 ? (
        <section className="bg-stone-50 py-16">
          <Container>
            <SectionHeading align="left" eyebrow="You may also like" title="Similar yatras" />
            <div className="mt-10">
              <PackageGrid packages={related} />
            </div>
          </Container>
        </section>
      ) : null}

      <MobileBookingBar pkg={pkg} />

      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={touristTripJsonLd(pkg)} />
      {pkg.faqs.length > 0 ? <JsonLd data={faqPageJsonLd(pkg.faqs)} /> : null}
    </div>
  );
}
