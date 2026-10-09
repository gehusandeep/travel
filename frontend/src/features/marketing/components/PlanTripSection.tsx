import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { planTripContent } from '@/content/marketing';
import { EnquiryForm } from '@/features/enquiry/components/EnquiryForm';

/** Nagarjuna-style "journey concierge" with the detailed trip-planning form. */
export function PlanTripSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow={planTripContent.eyebrow}
            title={planTripContent.title}
            description={planTripContent.description}
          />
          <ul className="mt-8 space-y-4">
            {planTripContent.points.map((point) => (
              <li key={point} className="flex gap-3 text-stone-700">
                <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                {point}
              </li>
            ))}
          </ul>
          <div className="relative mt-10 hidden aspect-[16/9] overflow-hidden rounded-3xl lg:block">
            <Image
              src={planTripContent.image.url}
              alt={planTripContent.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8">
          <h3 className="font-display text-2xl font-bold text-ink-950">Tell us about your yatra</h3>
          <EnquiryForm idPrefix="plan" source="PLAN_TRIP" variant="detailed" submitLabel="Plan my yatra" className="mt-6" />
        </div>
      </Container>
    </section>
  );
}
