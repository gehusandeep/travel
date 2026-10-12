'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface PackageTab {
  id: string;
  label: string;
  meta: string;
  /** Server-rendered panel content. All panels stay in the HTML for SEO. */
  panel: ReactNode;
}

interface PackageTabsProps {
  tabs: PackageTab[];
  label: string;
}

/** WAI-ARIA tabs (arrow keys, Home and End) for the landing page's route options. */
export function PackageTabs({ tabs, label }: PackageTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const selectAndFocus = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const actions: Record<string, () => void> = {
      ArrowRight: () => selectAndFocus(index + 1),
      ArrowLeft: () => selectAndFocus(index - 1),
      Home: () => selectAndFocus(0),
      End: () => selectAndFocus(tabs.length - 1),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="scrollbar-none relative flex gap-3 overflow-x-auto pb-2">
        {tabs.map((tab, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                'shrink-0 rounded-2xl border px-5 py-3 text-left transition-colors',
                selected
                  ? 'border-brand-700 bg-brand-700 text-white shadow-lg'
                  : 'border-stone-200 bg-white text-ink-950 hover:border-brand-300',
              )}
            >
              <span className="block text-sm font-semibold">{tab.label}</span>
              <span className={cn('block text-xs', selected ? 'text-white/85' : 'text-stone-500')}>{tab.meta}</span>
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={index !== activeIndex}
          tabIndex={0}
          className="mt-6 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
