import { ArrowRight, CircleCheck } from 'lucide-react';
import Image from 'next/image';
import { WhatsappIcon } from '@/components/icons/SocialIcons';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { heroContent } from '@/content/marketing';
import { EnquiryForm } from '@/features/enquiry/components/EnquiryForm';
import { routes, whatsappUrl } from '@/lib/routes';
import { RotatingWords } from './RotatingWords';

/** Home hero: Nagarjuna-style rotating headline plus Trip To Temples-style lead form. */
export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <Image
        src={heroContent.image.url}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-60"
        style={{ objectPosition: heroContent.imagePosition }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />

      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{heroContent.eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            {heroContent.title}
          </h1>
          <p className="mt-4 min-h-[2.6em] font-display text-2xl font-semibold leading-tight text-white/90 sm:min-h-[1.3em] sm:text-3xl">
            {heroContent.rotatingLead}{' '}
            <span className="text-gold-300">
              <RotatingWords words={heroContent.rotatingWords} />
            </span>
          </p>
          <p className="mt-6 max-w-xl text-lg text-white/85">{heroContent.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={routes.packages} size="lg">
              Explore packages
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Button>
            <Button
              href={whatsappUrl('Namaste! Please help me plan an Adi Kailash yatra.')}
              target="_blank"
              variant="whatsapp"
              size="lg"
            >
              <WhatsappIcon className="h-5 w-5" />
              WhatsApp us
            </Button>
          </div>

          <ul className="mt-10 grid gap-3 text-sm text-white/85 sm:grid-cols-3">
            {heroContent.assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CircleCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-6 text-ink-950 shadow-2xl sm:p-8">
          <h2 className="font-display text-2xl font-bold">Get yatra details</h2>
          <p className="mt-1 text-sm text-stone-600">
            Share your details and a yatra expert will call you back with dates, routes and prices.
          </p>
          <EnquiryForm idPrefix="hero" source="HERO_FORM" className="mt-6" />
        </div>
      </Container>
    </section>
  );
}
