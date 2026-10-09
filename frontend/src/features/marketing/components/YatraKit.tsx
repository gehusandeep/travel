import { FeatureIcon } from '@/components/icons/FeatureIcon';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { yatraKit } from '@/content/marketing';

/** Complimentary kit grid (Trip To Temples' "Goodies" section). */
export function YatraKit({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Complimentary yatra kit"
          title="Thoughtful essentials, packed for you"
          description="Every Kailash Mansarovar pilgrim receives a kit put together for high-altitude travel."
        />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {yatraKit.map((item) => (
            <li
              key={item.label}
              className="flex flex-col items-center gap-3 rounded-3xl border border-stone-200 bg-white p-5 text-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-50">
                <FeatureIcon name={item.icon} className="h-7 w-7 text-gold-700" />
              </span>
              <span className="text-sm font-medium text-ink-950">{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
