import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'light' | 'whatsapp';
export type ButtonSize = 'sm' | 'md' | 'lg';

const baseClasses =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800 focus-visible:outline-brand-700',
  secondary: 'bg-gold-300 text-ink-950 hover:bg-gold-200 focus-visible:outline-gold-500',
  outline: 'border border-brand-700 text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-700',
  ghost: 'text-ink-900 hover:bg-stone-100 focus-visible:outline-ink-900',
  light: 'bg-white text-ink-950 hover:bg-stone-100 focus-visible:outline-white',
  whatsapp: 'bg-[#0E7A41] text-white hover:bg-[#0B6534] focus-visible:outline-[#0E7A41]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonClasses({ variant = 'primary', size = 'md', className }: StyleProps = {}): string {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

interface CommonProps extends StyleProps {
  children: ReactNode;
}

type AnchorButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps | 'href'> & { href: string };

type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps> & { href?: undefined };

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const isInternalHref = (href: string) => href.startsWith('/') || href.startsWith('#');

/**
 * One component for every call to action. Renders a Next.js Link for internal
 * URLs, an <a> for external ones (tel:, mailto:, https:) and a <button> otherwise.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, variant, size, className, children, ...anchorProps } = props;
    const classes = buttonClasses({ variant, size, className });

    if (isInternalHref(href)) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    const rel = anchorProps.rel ?? (anchorProps.target === '_blank' ? 'noopener noreferrer' : undefined);
    return (
      <a href={href} className={classes} {...anchorProps} rel={rel}>
        {children}
      </a>
    );
  }

  const { variant, size, className, children, type = 'button', ...buttonProps } = props;
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...buttonProps}>
      {children}
    </button>
  );
}
