import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils/cn';
import { pluralize } from '@/lib/utils/format';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

export function CategoryCard({ category, headingLevel: Heading = 'h3', className }: CategoryCardProps) {
  return (
    <article
      className={cn(
        'group relative isolate flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink-950 p-6 text-white shadow-sm focus-within:ring-2 focus-within:ring-brand-700',
        className,
      )}
    >
      <Image
        src={category.image.url}
        alt={category.image.alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="-z-20 object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/95 via-ink-950/50 to-transparent" />
      <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">
        {pluralize(category.packageCount, 'package')}
      </p>
      <Heading className="mt-2 font-display text-2xl font-bold">
        <Link href={routes.category(category.path)} className="after:absolute after:inset-0 focus-visible:outline-none">
          {category.name}
        </Link>
      </Heading>
      <p className="mt-2 line-clamp-2 text-sm text-white/85">{category.shortDescription}</p>
    </article>
  );
}
