import { FeatureIcon } from '@/components/icons/FeatureIcon';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { IconFeature } from '@/content/marketing';
import { cn } from '@/lib/utils/cn';

interface FeatureGridSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  features: readonly IconFeature[];
  columns?: 3 | 4;
  className?: string;
}

/** Icon + title + text grid. Used for "Why choose us", "How we care for you" and company values. */
export function FeatureGridSection({
  id,
  eyebrow,
  title,
  description,
  features,
  columns = 4,
  className,
}: FeatureGridSectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-24 bg-stone-50 py-16 sm:py-20', className)}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <ul className={cn('mt-12 grid gap-6 sm:grid-cols-2', columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
          {features.map((feature) => (
            <li key={feature.title} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50">
                <FeatureIcon name={feature.icon} className="h-6 w-6 text-brand-700" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink-950">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{feature.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
