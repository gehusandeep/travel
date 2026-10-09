import Image from 'next/image';
import { SkipLink } from '@/components/layout/SkipLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { kailashLandingContent } from '@/content/kailash-landing';
import { EnquiryForm } from '@/features/enquiry/components/EnquiryForm';
import { FaqList } from '@/features/faqs/components/FaqList';
import type { Faq } from '@/features/faqs/types';
import { LandingHeader } from '@/features/landing/components/LandingHeader';
import { LandingPackagePanel } from '@/features/landing/components/LandingPackagePanel';
import { PackageTabs, type PackageTab } from '@/features/landing/components/PackageTabs';
import { CtaBanner } from '@/features/marketing/components/CtaBanner';
import { FeatureGridSection } from '@/features/marketing/components/FeatureGridSection';
import { YatraKit } from '@/features/marketing/components/YatraKit';
import { UpcomingDeparturesTable } from '@/features/packages/components/UpcomingDeparturesTable';
import { packageService } from '@/features/packages/server/package.service';
import type { PackageDetail, PackageSummary } from '@/features/packages/types';
import { TestimonialCarousel } from '@/features/testimonials/components/TestimonialCarousel';
import { testimonialService } from '@/features/testimonials/server/testimonial.service';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd, faqPageJsonLd, packageListJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';
import { formatPrice, formatShortDuration } from '@/lib/utils/format';
import { emptyPage } from '@/types/api';

const { categorySlug, seo, hero, highlights, care, sections } = kailashLandingContent;

export const metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: routes.kailashLanding,
  keywords: seo.keywords,
});

const breadcrumbs = [
  { name: 'Home', path: routes.home },
  { name: 'Kailash Mansarovar Yatra 2027', path: routes.kailashLanding },
];

/** "Kailash Mansarovar Yatra by Helicopter from Lucknow" → "By Helicopter from Lucknow" */
function tabLabel(title: string): string {
  const label = title.replace(/^Kailash (Mansarovar Yatra|Darshan)\s*/i, '').trim() || title;
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function uniqueByQuestion(faqs: readonly Faq[]): Faq[] {
  const seen = new Set<string>();
  return faqs.filter((faq) => {
    if (seen.has(faq.question)) return false;
    seen.add(faq.question);
    return true;
  });
}

/** Trip To Temples-style campaign landing page, rebuilt to be fully crawlable. */
export default async function KailashLandingPage() {
  const [packagePage, departures, testimonials] = await Promise.all([
    withFallback(packageService.list({ category: categorySlug, limit: 6 }), emptyPage<PackageSummary>(), 'landing packages'),
    withFallback(packageService.getUpcomingDepartures({ category: categorySlug, limit: 15 }), [], 'landing departures'),
    withFallback(testimonialService.list({ featured: true, limit: 6 }), [], 'landing testimonials'),
  ]);

  const details = (
    await Promise.all(
      packagePage.items.map((pkg) =>
        withFallback<PackageDetail | null>(packageService.getBySlug(pkg.slug), null, `landing ${pkg.slug}`),
      ),
    )
  ).filter((pkg): pkg is PackageDetail => pkg !== null);

  const faqs = uniqueByQuestion(details.flatMap((pkg) => pkg.faqs));

  const tabs: PackageTab[] = details.map((pkg) => ({
    id: pkg.slug,
    label: tabLabel(pkg.title),
    meta: `${formatShortDuration(pkg.durationDays, pkg.durationNights)} · from ${formatPrice(pkg.priceFrom)}`,
    panel: <LandingPackagePanel pkg={pkg} />,
  }));

  return (
    <>
      <SkipLink />
      <LandingHeader sections={sections} />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <section className="relative isolate overflow-hidden bg-ink-950 text-white">
          <Image src={hero.image.url} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-55" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
          <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{hero.eyebrow}</p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{hero.title}</h1>
              <p className="mt-6 max-w-xl text-lg text-white/85">{hero.description}</p>
              <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {highlights.map((item) => (
                  <div key={item.label} className="flex flex-col-reverse rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                    <dt className="mt-1 text-xs text-white/75">{item.label}</dt>
                    <dd className="font-display text-xl font-bold text-gold-300">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl bg-white p-6 text-ink-950 shadow-2xl sm:p-8">
              <h2 className="font-display text-2xl font-bold">Get 2027 yatra details</h2>
              <p className="mt-1 text-sm text-stone-600">Dates, routes and prices on WhatsApp or a call within 24 hours.</p>
              <EnquiryForm
                idPrefix="landing-hero"
                source="LANDING_PAGE"
                defaultMessage="I am interested in the Kailash Mansarovar Yatra 2027."
                className="mt-6"
              />
            </div>
          </Container>
        </section>

        <section id="packages" className="scroll-mt-20 py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Choose your route"
              title="Kailash Mansarovar Yatra 2027 packages"
              description="Fly in by helicopter, travel overland from Kathmandu or take a short darshan-only yatra. Every option includes visas, permits and an Indian tour manager."
            />
            <div className="mt-10">
              {tabs.length > 0 ? (
                <PackageTabs tabs={tabs} label="Kailash Mansarovar Yatra packages" />
              ) : (
                <EmptyState
                  title="2027 packages are being finalised"
                  description="Send an enquiry and we will share routes and prices first."
                />
              )}
            </div>
          </Container>
        </section>

        <section id="dates" className="scroll-mt-20 bg-stone-50 py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Fixed departures 2027"
              title="Batch dates and prices"
              description="Seat availability is shown for every batch. Book early: helicopter batches fill first."
            />
            <div className="mt-10">
              {departures.length > 0 ? (
                <UpcomingDeparturesTable
                  departures={departures}
                  caption="Kailash Mansarovar Yatra 2027 departures"
                  source="LANDING_PAGE"
                />
              ) : (
                <EmptyState title="2027 dates will be announced soon" />
              )}
            </div>
          </Container>
        </section>

        <FeatureGridSection
          id="why-us"
          eyebrow="Why pilgrims choose us"
          title="How we look after you on the yatra"
          features={care}
          columns={3}
        />

        <YatraKit />

        {testimonials.length > 0 ? (
          <section id="reviews" className="scroll-mt-20 py-16 sm:py-20">
            <Container>
              <SectionHeading eyebrow="Pilgrim stories" title="What our yatris say" />
              <div className="mt-10">
                <TestimonialCarousel testimonials={testimonials} />
              </div>
            </Container>
          </section>
        ) : null}

        {faqs.length > 0 ? (
          <section id="faqs" className="scroll-mt-20 bg-stone-50 py-16 sm:py-20">
            <Container>
              <SectionHeading eyebrow="Good to know" title="Kailash Mansarovar Yatra FAQs" />
              <FaqList faqs={faqs} className="mx-auto mt-10 max-w-3xl" />
            </Container>
          </section>
        ) : null}

        <CtaBanner
          title="Your Kailash yatra starts with one call"
          description="Seats for the 2027 season are filling. Speak to our Kailash team and reserve your place on the batch that suits you."
          source="LANDING_PAGE"
        />
      </main>

      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={packageListJsonLd(packagePage.items, 'Kailash Mansarovar Yatra 2027 packages')} />
      {faqs.length > 0 ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}
    </>
  );
}
