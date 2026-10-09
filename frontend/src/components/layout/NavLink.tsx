'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  onClick?: () => void;
}

/** Link that marks itself with aria-current="page" when it matches the current route. */
export function NavLink({
  href,
  children,
  className,
  activeClassName = 'text-brand-700',
  exact = false,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact || href === '/' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  );
}
