import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/seo/json-ld';
import { cn } from '@/lib/utils/cn';

interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  tone?: 'dark' | 'light';
  className?: string;
}

/** Visual breadcrumb trail. Pair it with breadcrumbJsonLd() for rich results. */
export function Breadcrumbs({ items, tone = 'dark', className }: BreadcrumbsProps) {
  const isLight = tone === 'light';

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={cn('flex flex-wrap items-center gap-1 text-sm', isLight ? 'text-white/80' : 'text-stone-600')}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 ? <ChevronRight aria-hidden="true" className="h-4 w-4 opacity-60" /> : null}
              {isLast ? (
                <span aria-current="page" className={cn('font-medium', isLight ? 'text-white' : 'text-ink-950')}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className={cn('hover:underline', isLight ? 'hover:text-white' : 'hover:text-brand-700')}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
