'use client';

import { Cookie } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { routes } from '@/lib/routes';

const CONSENT_KEY = 'himalaya-yatra:cookie-consent';

export type ConsentChoice = 'accepted' | 'declined';

/** Read this before loading analytics or marketing scripts. */
export function getCookieConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Storage unavailable: the banner simply shows again next visit.
    }
    setVisible(false);
  };

  return (
    <section
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-stone-200 sm:inset-x-auto sm:left-6"
    >
      <div className="flex gap-3">
        <Cookie aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
        <div>
          <p className="text-sm font-semibold text-ink-950">We value your privacy</p>
          <p className="mt-1 text-sm text-stone-600">
            We use essential cookies to run this site. With your permission we would also use analytics
            cookies to understand how visitors use it.{' '}
            <Link href={routes.privacy} className="font-medium text-brand-700 underline">
              Privacy policy
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => choose('declined')}>
          Decline
        </Button>
        <Button size="sm" onClick={() => choose('accepted')}>
          Accept
        </Button>
      </div>
    </section>
  );
}
