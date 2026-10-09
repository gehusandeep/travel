import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { comfortTiers } from '@/content/marketing';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils/cn';

/** Budget / Standard / Deluxe / Premium comparison, as on Nagarjuna Travels. */
export function ComfortTiers() {
  return (
    <section className="bg-ink-950 py-16 text-white sm:py-20">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Choose your comfort level"
          title="One yatra, four ways to travel"
          description="Every destination comes in different comfort levels, so you can match the journey to your budget, age and fitness."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {comfortTiers.map((tier) => (
            <li
              key={tier.tier}
              className={cn(
                'relative flex flex-col rounded-3xl p-6',
                tier.highlighted ? 'bg-white text-ink-950 shadow-2xl' : 'bg-white/5 ring-1 ring-white/15',
              )}
            >
              {tier.highlighted ? (
                <Badge variant="gold" className="absolute -top-3 left-6">
                  Most popular
                </Badge>
              ) : null}
              <h3 className="font-display text-2xl font-bold">{tier.name}</h3>
              <p className={cn('mt-2 text-sm', tier.highlighted ? 'text-stone-600' : 'text-white/75')}>{tier.tagline}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check
                      aria-hidden="true"
                      className={cn('mt-0.5 h-4 w-4 shrink-0', tier.highlighted ? 'text-brand-700' : 'text-gold-300')}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href={`${routes.packages}?tier=${tier.tier.toLowerCase()}`}
                variant={tier.highlighted ? 'primary' : 'light'}
                className="mt-6"
              >
                View {tier.name.toLowerCase()} packages
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
