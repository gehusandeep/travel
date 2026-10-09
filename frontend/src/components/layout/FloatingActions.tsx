'use client';

import { ArrowUp, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WhatsappIcon } from '@/components/icons/SocialIcons';
import { siteConfig } from '@/config/site';
import { whatsappUrl } from '@/lib/routes';
import { cn } from '@/lib/utils/cn';

const WHATSAPP_MESSAGE = 'Namaste! I would like to know more about your yatra packages.';

/** WhatsApp, call and back-to-top shortcuts, as on both reference sites. */
export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="fixed bottom-24 right-4 z-30 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        className={cn(
          'grid h-11 w-11 place-items-center rounded-full bg-white text-ink-950 shadow-lg ring-1 ring-stone-200 transition-opacity',
          showBackToTop ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <ArrowUp aria-hidden="true" className="h-5 w-5" />
      </button>
      <a
        href={siteConfig.contact.phoneHref}
        aria-label={`Call us on ${siteConfig.contact.phone}`}
        className="grid h-12 w-12 place-items-center rounded-full bg-brand-700 text-white shadow-lg transition-colors hover:bg-brand-800 lg:hidden"
      >
        <Phone aria-hidden="true" className="h-5 w-5" />
      </a>
      <a
        href={whatsappUrl(WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (opens in a new tab)"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#0E7A41] text-white shadow-lg transition-colors hover:bg-[#0B6534]"
      >
        <WhatsappIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
