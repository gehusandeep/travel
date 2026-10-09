import { CircleCheck, CircleX } from 'lucide-react';

interface InclusionListProps {
  inclusions: readonly string[];
  exclusions: readonly string[];
}

export function InclusionList({ inclusions, exclusions }: InclusionListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6">
        <h3 className="text-lg font-semibold text-ink-950">What is included</h3>
        <ul className="mt-4 space-y-3">
          {inclusions.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-stone-700">
              <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-red-200 bg-red-50/60 p-6">
        <h3 className="text-lg font-semibold text-ink-950">Not included</h3>
        <ul className="mt-4 space-y-3">
          {exclusions.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-stone-700">
              <CircleX aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
