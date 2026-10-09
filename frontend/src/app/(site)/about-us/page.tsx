import Image from 'next/image';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { aboutContent } from '@/content/about';
import { CtaBanner } from '@/features/marketing/components/CtaBanner';
import { FeatureGridSection } from '@/features/marketing/components/FeatureGridSection';
import { StatsStrip } from '@/features/marketing/components/StatsStrip';
import { TrustBadges } from '@/features/marketing/components/TrustBadges';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: aboutContent.seo.title,
  description: aboutContent.seo.description,
  path: routes.about,
});

const breadcrumbs = [
  { name: 'Home', path: routes.home },
  { name: 'About us', path: routes.about },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About us" title={aboutContent.title} breadcrumbs={breadcrumbs} />

      <section className="py-16 sm:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-stone-700">
            {aboutContent.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <figure className="border-l-4 border-gold-400 pl-5">
              <blockquote lang={aboutContent.quote.lang} className="font-semibold text-ink-950">
                {aboutContent.quote.text}
              </blockquote>
              <figcaption className="mt-1 text-base text-stone-600">{aboutContent.quote.translation}</figcaption>
            </figure>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-100">
            <Image
              src={aboutContent.image.url}
              alt={aboutContent.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <StatsStrip />

      <FeatureGridSection eyebrow="Our values" title="What guides every yatra we plan" features={aboutContent.values} />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="How it works" title="From your first call to a safe return" />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.process.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-stone-200 bg-white p-6">
                <span aria-hidden="true" className="font-display text-3xl font-bold text-brand-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <TrustBadges />
      <CtaBanner />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
