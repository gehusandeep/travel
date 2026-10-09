'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { routes } from '@/lib/routes';

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Something went wrong</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-4xl">We could not load this page</h1>
      <p className="mx-auto mt-4 max-w-xl text-stone-600">
        Please try again in a moment. If the problem continues, call us on {siteConfig.contact.phone} and we will
        help you directly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href={routes.home} variant="outline">
          Go to home page
        </Button>
      </div>
    </Container>
  );
}
