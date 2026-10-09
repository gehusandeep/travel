import { PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { ctaContent } from '@/content/marketing';
import { EnquiryButton } from '@/features/enquiry/components/EnquiryButton';
import type { EnquirySource } from '@/features/enquiry/types';

interface CtaBannerProps {
  title?: string;
  description?: string;
  source?: EnquirySource;
}

export function CtaBanner({ title = ctaContent.title, description = ctaContent.description, source }: CtaBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-16 text-white sm:py-24">
      <Image src={ctaContent.image.url} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
      <Container className="text-center">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <EnquiryButton size="lg" source={source}>
            Secure your seat
          </EnquiryButton>
          <Button href={siteConfig.contact.phoneHref} variant="light" size="lg">
            <PhoneCall aria-hidden="true" className="h-5 w-5" />
            {siteConfig.contact.phone}
          </Button>
        </div>
      </Container>
    </section>
  );
}
