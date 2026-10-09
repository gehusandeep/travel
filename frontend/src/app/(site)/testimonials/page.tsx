import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { CtaBanner } from '@/features/marketing/components/CtaBanner';
import { TestimonialCard } from '@/features/testimonials/components/TestimonialCard';
import { testimonialService } from '@/features/testimonials/server/testimonial.service';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Pilgrim Reviews and Testimonials',
  description:
    'Read what pilgrims say about our Kailash Mansarovar, Adi Kailash, Char Dham, Muktinath and Kashi yatras.',
  path: routes.testimonials,
});

const breadcrumbs = [
  { name: 'Home', path: routes.home },
  { name: 'Testimonials', path: routes.testimonials },
];

export default async function TestimonialsPage() {
  const testimonials = await withFallback(testimonialService.list({ limit: 50 }), [], 'testimonials');

  return (
    <>
      <PageHeader
        eyebrow="Pilgrim stories"
        title="What our yatris say"
        description="Experiences shared by pilgrims who travelled with us across the Himalaya and beyond."
        breadcrumbs={breadcrumbs}
      />
      <Container className="py-12 sm:py-16">
        {testimonials.length === 0 ? (
          <EmptyState title="Reviews are on their way" description="Please check back soon." />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <li key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
        )}
      </Container>
      <CtaBanner />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
