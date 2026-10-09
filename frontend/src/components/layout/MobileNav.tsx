'use client';

import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { mainNavLinks, type NavGroup } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { enquiryModalOpened } from '@/features/enquiry/enquiry.slice';
import { routes } from '@/lib/routes';
import { useAppDispatch } from '@/store/hooks';
import { Logo } from './Logo';
import { NavLink } from './NavLink';

const itemClasses =
  'flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-ink-950 hover:bg-stone-100';

/** Slide-in menu built on the native <dialog> element (focus trap and Escape handling for free). */
export function MobileNav({ destinations }: { destinations: NavGroup[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  const openEnquiry = () => {
    close();
    dispatch(enquiryModalOpened({ source: 'ENQUIRY_MODAL' }));
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="grid h-10 w-10 place-items-center rounded-full text-ink-900 transition-colors hover:bg-stone-100 xl:hidden"
      >
        <Menu aria-hidden="true" className="h-6 w-6" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,100vw)] max-w-none bg-white p-0 text-ink-950 shadow-2xl backdrop:bg-ink-950/60 xl:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
            <Logo onClick={close} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-stone-100"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              <li>
                <NavLink href={routes.home} exact className={itemClasses} onClick={close}>
                  Home
                </NavLink>
              </li>
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} className={itemClasses} onClick={close}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-stone-500">Destinations</p>
            <ul className="mt-2 space-y-1">
              {destinations.map((group) =>
                group.children.length === 0 ? (
                  <li key={group.href}>
                    <Link href={group.href} className={itemClasses} onClick={close}>
                      {group.label}
                    </Link>
                  </li>
                ) : (
                  <li key={group.href}>
                    <details className="group">
                      <summary className={`${itemClasses} cursor-pointer list-none`}>
                        {group.label}
                        <ChevronDown aria-hidden="true" className="h-5 w-5 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="mb-2 ml-3 space-y-1 border-l border-stone-200 pl-3">
                        <li>
                          <Link href={group.href} onClick={close} className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-700 hover:bg-stone-100">
                            All {group.label}
                          </Link>
                        </li>
                        {group.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} onClick={close} className="block rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-stone-200 p-5">
            <Button className="w-full" onClick={openEnquiry} aria-haspopup="dialog">
              Plan my yatra
            </Button>
            <Button href={siteConfig.contact.phoneHref} variant="outline" className="w-full">
              <Phone aria-hidden="true" className="h-4 w-4" />
              {siteConfig.contact.phone}
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
