import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface RatingStarsProps {
  rating: number;
  className?: string;
}

export function RatingStars({ rating, className }: RatingStarsProps) {
  const filled = Math.round(Math.min(5, Math.max(0, rating)));

  return (
    <span role="img" aria-label={`Rated ${rating} out of 5`} className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn('h-4 w-4', index < filled ? 'fill-gold-400 text-gold-400' : 'text-stone-300')}
        />
      ))}
    </span>
  );
}
