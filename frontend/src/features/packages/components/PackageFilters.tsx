'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SelectField } from '@/components/ui/form-fields';
import type { CategoryOption } from '@/features/categories/types';
import { cn } from '@/lib/utils/cn';
import { DURATION_OPTIONS, type ExplorerFilters } from '../explorer-filters';
import { MODE_LABELS, REGION_LABELS, TIER_LABELS } from '../package-labels';
import { PACKAGE_REGIONS, PACKAGE_TIERS, TRAVEL_MODES } from '../types';

interface PackageFiltersProps {
  filters: ExplorerFilters;
  categoryOptions: CategoryOption[];
  showCategory: boolean;
  activeCount: number;
  onChange: (patch: Partial<ExplorerFilters>) => void;
  onReset: () => void;
}

const SEARCH_DEBOUNCE_MS = 400;

export function PackageFilters({
  filters,
  categoryOptions,
  showCategory,
  activeCount,
  onChange,
  onReset,
}: PackageFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(filters.q);
  const lastAppliedQuery = useRef(filters.q);

  // Debounce the free-text search so we do not fire a request on every keystroke.
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed === lastAppliedQuery.current) return undefined;

    const timer = window.setTimeout(() => {
      lastAppliedQuery.current = trimmed;
      onChange({ q: trimmed });
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query, onChange]);

  return (
    <aside aria-label="Filter packages" className="lg:sticky lg:top-28 lg:self-start">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="package-filters"
        className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3 font-semibold text-ink-950 lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal aria-hidden="true" className="h-5 w-5" />
          Filters{activeCount > 0 ? ` (${activeCount})` : ''}
        </span>
        <span className="text-sm text-brand-700">{isOpen ? 'Hide' : 'Show'}</span>
      </button>

      <div
        id="package-filters"
        className={cn('mt-3 space-y-5 rounded-3xl border border-stone-200 bg-white p-5 lg:mt-0 lg:block', isOpen ? 'block' : 'hidden')}
      >
        <div>
          <label htmlFor="package-search" className="mb-1.5 block text-sm font-medium text-ink-900">
            Search
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              id="package-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Kailash, Kedarnath, helicopter…"
              className="block w-full rounded-xl border border-stone-300 py-2.5 pl-9 pr-3 text-sm text-ink-950 placeholder:text-stone-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
            />
          </div>
        </div>

        {showCategory ? (
          <SelectField
            id="filter-category"
            label="Destination"
            showOptional={false}
            value={filters.category}
            onChange={(event) => onChange({ category: event.target.value })}
          >
            <option value="">All destinations</option>
            {categoryOptions.map((option) => (
              <option key={option.slug} value={option.slug}>
                {`${'\u00A0\u00A0'.repeat(option.depth)}${option.name}`}
              </option>
            ))}
          </SelectField>
        ) : null}

        <SelectField
          id="filter-region"
          label="Region"
          showOptional={false}
          value={filters.region}
          onChange={(event) => onChange({ region: event.target.value as ExplorerFilters['region'] })}
        >
          <option value="">India and abroad</option>
          {PACKAGE_REGIONS.map((region) => (
            <option key={region} value={region}>
              {REGION_LABELS[region]}
            </option>
          ))}
        </SelectField>

        <SelectField
          id="filter-duration"
          label="Duration"
          showOptional={false}
          value={filters.duration}
          onChange={(event) => onChange({ duration: event.target.value as ExplorerFilters['duration'] })}
        >
          <option value="">Any duration</option>
          {DURATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <SelectField
          id="filter-tier"
          label="Comfort level"
          showOptional={false}
          value={filters.tier}
          onChange={(event) => onChange({ tier: event.target.value as ExplorerFilters['tier'] })}
        >
          <option value="">Any comfort level</option>
          {PACKAGE_TIERS.map((tier) => (
            <option key={tier} value={tier}>
              {TIER_LABELS[tier]}
            </option>
          ))}
        </SelectField>

        <SelectField
          id="filter-mode"
          label="Travel mode"
          showOptional={false}
          value={filters.mode}
          onChange={(event) => onChange({ mode: event.target.value as ExplorerFilters['mode'] })}
        >
          <option value="">Any travel mode</option>
          {TRAVEL_MODES.map((mode) => (
            <option key={mode} value={mode}>
              {MODE_LABELS[mode]}
            </option>
          ))}
        </SelectField>

        {activeCount > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => {
              setQuery('');
              lastAppliedQuery.current = '';
              onReset();
            }}
          >
            <X aria-hidden="true" className="h-4 w-4" />
            Clear all filters
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
