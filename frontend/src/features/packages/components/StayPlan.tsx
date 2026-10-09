import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { StayStop } from '../types';

/** Trip To Temples style route: "Lucknow (1N) → Nepalgunj (1N) → …" */
export function StayPlan({ stops, className }: { stops: readonly StayStop[]; className?: string }) {
  return (
    <ol aria-label="Stay plan" className={cn('flex flex-wrap items-center gap-2', className)}>
      {stops.map((stop, index) => (
        <li key={`${stop.place}-${index}`} className="flex items-center gap-2">
          <span className="rounded-full border border-gold-300 bg-gold-50 px-3 py-1.5 text-sm font-medium text-ink-950">
            {stop.place} <span className="text-gold-800">({stop.nights}N)</span>
          </span>
          {index < stops.length - 1 ? <ArrowRight aria-hidden="true" className="h-4 w-4 text-stone-400" /> : null}
        </li>
      ))}
    </ol>
  );
}
