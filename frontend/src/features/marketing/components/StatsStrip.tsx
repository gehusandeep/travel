import { Container } from '@/components/ui/Container';
import { trustStats } from '@/content/marketing';

export function StatsStrip() {
  return (
    <section aria-label="At a glance" className="border-b border-stone-200 bg-white">
      <Container>
        <dl className="grid grid-cols-2 gap-y-2 py-8 lg:grid-cols-4 lg:divide-x lg:divide-stone-200">
          {trustStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse px-2 py-2 text-center sm:px-4">
              <dt className="mt-1 text-sm text-stone-600">{stat.label}</dt>
              <dd className="font-display text-2xl font-bold text-brand-700 sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
