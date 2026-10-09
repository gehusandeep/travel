'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsWishlisted, wishlistToggled } from '../wishlist.slice';

interface WishlistButtonProps {
  slug: string;
  title: string;
  className?: string;
}

export function WishlistButton({ slug, title, className }: WishlistButtonProps) {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((state) => selectIsWishlisted(state, slug));

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
      onClick={() => dispatch(wishlistToggled(slug))}
      className={cn(
        'relative z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-ink-900 shadow transition hover:scale-105 hover:bg-white',
        className,
      )}
    >
      <Heart aria-hidden="true" className={cn('h-5 w-5', saved && 'fill-brand-700 text-brand-700')} />
    </button>
  );
}
