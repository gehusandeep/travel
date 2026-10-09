import { BedDouble, MountainSnow, Route, Utensils, type LucideIcon } from 'lucide-react';
import { Disclosure } from '@/components/ui/Disclosure';
import { MEAL_LABELS } from '../package-labels';
import type { ItineraryDay } from '../types';

function DayFact({ icon: Icon, term, value }: { icon: LucideIcon; term: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <dt className="flex items-center gap-1.5 font-medium text-ink-900">
        <Icon aria-hidden="true" className="h-4 w-4 text-stone-400" />
        {term}:
      </dt>
      <dd>{value}</dd>
    </div>
  );
}

/** Day-wise itinerary. Content stays in the HTML (native <details>), so it is fully indexable. */
export function ItineraryList({ days }: { days: readonly ItineraryDay[] }) {
  return (
    <ol className="space-y-3">
      {days.map((day) => (
        <li key={day.day}>
          <Disclosure
            defaultOpen={day.day === 1}
            summary={
              <span className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {day.day}
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-brand-700">Day {day.day}</span>
                  <span className="block">{day.title}</span>
                </span>
              </span>
            }
          >
            <p>{day.description}</p>
            <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
              {day.overnight ? <DayFact icon={BedDouble} term="Overnight" value={day.overnight} /> : null}
              {day.distance ? <DayFact icon={Route} term="Distance" value={day.distance} /> : null}
              {day.altitude ? <DayFact icon={MountainSnow} term="Altitude" value={day.altitude} /> : null}
              {day.meals.length > 0 ? (
                <DayFact icon={Utensils} term="Meals" value={day.meals.map((meal) => MEAL_LABELS[meal]).join(', ')} />
              ) : null}
            </dl>
          </Disclosure>
        </li>
      ))}
    </ol>
  );
}
