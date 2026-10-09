import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'dark',
  as: Heading = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  const isLight = tone === 'light';

  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
            isLight ? 'text-gold-300' : 'text-brand-700',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          'font-display text-3xl font-bold leading-tight sm:text-4xl',
          isLight ? 'text-white' : 'text-ink-950',
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className={cn('mt-4 text-base leading-relaxed sm:text-lg', isLight ? 'text-white/80' : 'text-stone-600')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
