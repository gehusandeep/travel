import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { FaqList } from '@/features/faqs/components/FaqList';
import { faqService } from '@/features/faqs/server/faq.service';
import { FAQ_TOPIC_LABELS, FAQ_TOPICS } from '@/features/faqs/types';
import { CtaBanner } from '@/features/marketing/components/CtaBanner';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Answers about booking, payments, cancellations, permits, health and travel on our Kailash, Adi Kailash, Char Dham and Nepal yatras.',
  path: routes.faqs,
});

const breadcrumbs = [
  { name: 'Home', path: routes.home },
  { name: 'FAQs', path: routes.faqs },
];

export default async function FaqsPage() {
  const faqs = await withFallback(faqService.listGeneral(), [], 'faqs');
  const groups = FAQ_TOPICS.map((topic) => ({ topic, items: faqs.filter((faq) => faq.topic === topic) })).filter(
    (group) => group.items.length > 0,
  );

  return (
    <>
      <PageHeader
        eyebrow="Help centre"
        title="Frequently asked questions"
        description="Everything you need to know before you book: permits, payments, health and what to expect on the yatra."
        breadcrumbs={breadcrumbs}
      />
      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.length === 0 ? (
            <EmptyState title="FAQs are being updated" description="Please call or WhatsApp us with your question." />
          ) : (
            groups.map((group) => (
              <section key={group.topic} aria-labelledby={`faq-${group.topic.toLowerCase()}`}>
                <h2 id={`faq-${group.topic.toLowerCase()}`} className="font-display text-2xl font-bold text-ink-950">
                  {FAQ_TOPIC_LABELS[group.topic]}
                </h2>
                <FaqList faqs={group.items} className="mt-5" />
              </section>
            ))
          )}
        </div>
      </Container>
      <CtaBanner
        title="Still have a question?"
        description="Our yatra experts are happy to help with anything not covered here."
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      {faqs.length > 0 ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}
    </>
  );
}
