import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils/cn';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
  onClick?: () => void;
}

/** "Divya Darshan" stays visible on small phones; " Tours" joins it from the sm breakpoint. */
const nameSuffix = siteConfig.name.slice(siteConfig.shortName.length);

export function Logo({ tone = 'dark', className, onClick }: LogoProps) {
  const isLight = tone === 'light';

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name}, home`}
      className={cn('flex shrink-0 items-center gap-2 sm:gap-2.5', className)}
    >
      {/* Decorative: the brand name next to it gives the link its accessible name. */}
      <Image src={siteConfig.logo} alt="" width={48} height={48} className="h-9 w-9 sm:h-11 sm:w-11" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-base font-bold tracking-wide sm:text-lg',
            isLight ? 'text-white' : 'text-ink-950',
          )}
        >
          {siteConfig.shortName}
          <span className="hidden sm:inline">{nameSuffix}</span>
        </span>
        <span
          className={cn(
            // Tighter tracking on phones keeps the logo, search, wishlist and menu on one 360px row.
            'mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] sm:text-[0.65rem] sm:tracking-[0.2em]',
            isLight ? 'text-gold-300' : 'text-brand-700',
          )}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}
