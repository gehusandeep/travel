import { Compass } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-6 py-14 text-center',
        className,
      )}
    >
      <Compass aria-hidden="true" className="h-10 w-10 text-brand-700" />
      <p className="mt-4 text-lg font-semibold text-ink-950">{title}</p>
      {description ? <p className="mt-2 max-w-md text-sm text-stone-600">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
