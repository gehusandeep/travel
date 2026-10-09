import { Car, Footprints, Helicopter, Plane, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { MODE_LABELS } from '../package-labels';
import type { TravelMode } from '../types';

export const MODE_ICONS: Record<TravelMode, LucideIcon> = {
  ROAD: Car,
  FLIGHT: Plane,
  HELICOPTER: Helicopter,
  TREK: Footprints,
};

export function TravelModeList({ modes, className }: { modes: readonly TravelMode[]; className?: string }) {
  return (
    <ul aria-label="Travel modes" className={cn('flex flex-wrap items-center gap-x-3 gap-y-1', className)}>
      {modes.map((mode) => {
        const Icon = MODE_ICONS[mode];
        return (
          <li key={mode} className="inline-flex items-center gap-1 text-xs text-stone-600">
            <Icon aria-hidden="true" className="h-3.5 w-3.5" />
            {MODE_LABELS[mode]}
          </li>
        );
      })}
    </ul>
  );
}
