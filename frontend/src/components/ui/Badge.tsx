import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export type BadgeVariant = 'neutral' | 'brand' | 'gold' | 'success' | 'warning' | 'danger' | 'light' | 'dark';

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-stone-100 text-stone-700',
  brand: 'bg-brand-50 text-brand-800',
  gold: 'bg-gold-100 text-gold-900',
  success: 'bg-emerald-50 text-emerald-800',
  warning: 'bg-amber-100 text-amber-900',
  danger: 'bg-red-50 text-red-800',
  light: 'bg-white/95 text-ink-950 shadow-sm',
  dark: 'bg-ink-950/85 text-white',
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
