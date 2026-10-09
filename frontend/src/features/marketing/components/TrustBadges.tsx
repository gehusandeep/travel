import { BadgeCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';

/** Registration badges (Nagarjuna shows tourism board, MSME and GST numbers). */
export function TrustBadges() {
  return (
    <section aria-labelledby="trust-heading" className="border-y border-stone-200 bg-stone-50 py-10">
      <Container className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 id="trust-heading" className="font-display text-xl font-bold text-ink-950">
            Uttarakhand registered tour operator
          </h2>
          <p className="mt-1 text-sm text-stone-600">A local team based in {siteConfig.address.locality}, on the Adi Kailash route.</p>
        </div>
        <ul className="flex flex-wrap justify-center gap-4">
          {siteConfig.registrations.map((registration) => (
            <li
              key={registration.label}
              className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-stone-200"
            >
              <BadgeCheck aria-hidden="true" className="h-6 w-6 shrink-0 text-emerald-700" />
              <span className="text-left">
                <span className="block text-sm font-semibold text-ink-950">{registration.label}</span>
                <span className="block text-xs text-stone-600">{registration.number ?? registration.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
