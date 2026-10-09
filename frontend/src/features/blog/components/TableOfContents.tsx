import { cn } from '@/lib/utils/cn';
import type { TocItem } from '../types';

export function TableOfContents({ items }: { items: readonly TocItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav aria-labelledby="toc-heading" className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
      <p id="toc-heading" className="text-sm font-semibold uppercase tracking-wider text-ink-950">
        On this page
      </p>
      <ol className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={cn(item.level === 3 && 'pl-4')}>
            <a href={`#${item.id}`} className="text-stone-600 transition-colors hover:text-brand-700">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
