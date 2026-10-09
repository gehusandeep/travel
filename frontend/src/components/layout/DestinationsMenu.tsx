'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import type { NavGroup } from '@/config/navigation';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils/cn';
import { navItemClasses } from './nav-styles';

/**
 * Mega menu for destinations. Opens on mouse hover or on click/Enter, closes on
 * Escape, outside click, focus leaving the menu, or navigation. The panel stays
 * in the HTML so crawlers can follow every destination link.
 */
export function DestinationsMenu({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLLIElement>(null);
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <li
      ref={containerRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(navItemClasses, open && 'text-brand-700')}
      >
        Destinations
        <ChevronDown aria-hidden="true" className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>

      <div
        id={panelId}
        className={cn(
          'absolute left-1/2 top-full z-50 w-[40rem] -translate-x-1/2 pt-3 transition duration-150',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
        )}
      >
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl">
          <ul className="grid grid-cols-2 gap-6">
            {groups.map((group) => (
              <li key={group.href}>
                <Link
                  href={group.href}
                  onClick={close}
                  className="font-semibold text-ink-950 transition-colors hover:text-brand-700"
                >
                  {group.label}
                </Link>
                {group.description ? <p className="mt-1 text-xs leading-relaxed text-stone-500">{group.description}</p> : null}
                {group.children.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          className="text-sm text-stone-600 transition-colors hover:text-brand-700"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-stone-100 pt-4">
            <Link
              href={routes.destinations}
              onClick={close}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
            >
              View all destinations <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
