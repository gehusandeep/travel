import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils/cn';

export interface InPageSection {
  id: string;
  label: string;
}

interface InPageNavProps {
  sections: readonly InPageSection[];
  label: string;
  /** Tailwind `top-*` classes matching the sticky header height above it. */
  stickyOffsetClassName?: string;
}

/** Sticky "jump to section" bar, as on both reference sites' package pages. */
export function InPageNav({ sections, label, stickyOffsetClassName = 'top-16 lg:top-20' }: InPageNavProps) {
  return (
    <nav
      aria-label={label}
      className={cn('sticky z-20 border-b border-stone-200 bg-white/95 backdrop-blur', stickyOffsetClassName)}
    >
      <Container>
        <ul className="scrollbar-none -mx-2 flex gap-1 overflow-x-auto py-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-100 hover:text-ink-950"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
