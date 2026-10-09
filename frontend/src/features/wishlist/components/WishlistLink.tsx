'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/lib/routes';
import { useAppSelector } from '@/store/hooks';
import { selectWishlistCount } from '../wishlist.slice';

export function WishlistLink() {
  const count = useAppSelector(selectWishlistCount);

  return (
    <Link
      href={routes.wishlist}
      aria-label={count > 0 ? `Wishlist, ${count} saved` : 'Wishlist'}
      className="relative grid h-10 w-10 place-items-center rounded-full text-ink-900 transition-colors hover:bg-stone-100"
    >
      <Heart aria-hidden="true" className="h-5 w-5" />
      {count > 0 ? (
        <span
          aria-hidden="true"
          className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-700 px-1 text-[0.625rem] font-bold text-white"
        >
          {count}
        </span>
      ) : null}
    </Link>
  );
}
