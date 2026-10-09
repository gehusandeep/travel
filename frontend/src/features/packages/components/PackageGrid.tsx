import type { ReactNode } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils/cn';
import type { PackageSummary } from '../types';
import { PackageCard } from './PackageCard';

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
} as const;

interface PackageGridProps {
  packages: readonly PackageSummary[];
  columns?: keyof typeof columnClasses;
  /** Number of leading cards whose images load eagerly. */
  priorityCount?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
}

export function PackageGrid({
  packages,
  columns = 3,
  priorityCount = 0,
  emptyTitle = 'No packages found',
  emptyDescription = 'Try changing the filters, or send us an enquiry and we will design a yatra for you.',
  emptyAction,
}: PackageGridProps) {
  if (packages.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />;
  }

  return (
    <ul className={cn('grid gap-6', columnClasses[columns])}>
      {packages.map((pkg, index) => (
        <li key={pkg.id}>
          <PackageCard pkg={pkg} priority={index < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
