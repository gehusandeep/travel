import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface DisclosureProps {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  id?: string;
}

/**
 * Accessible accordion item built on native <details>. Works without JavaScript
 * and keeps the content in the HTML, so search engines can index it.
 */
export function Disclosure({ summary, children, defaultOpen = false, className, id }: DisclosureProps) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className={cn('group rounded-2xl border border-stone-200 bg-white transition open:shadow-sm', className)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 font-semibold text-ink-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700">
        <span>{summary}</span>
        <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-stone-500 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 leading-relaxed text-stone-700">{children}</div>
    </details>
  );
}
