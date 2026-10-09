import { Clock, Gauge, MapPin, MountainSnow, Sun, UsersRound, type LucideIcon } from 'lucide-react';
import { formatDuration } from '@/lib/utils/format';
import { DIFFICULTY_LABELS } from '../package-labels';
import type { PackageDetail } from '../types';

interface Fact {
  icon: LucideIcon;
  label: string;
  value: string;
}

function buildFacts(pkg: PackageDetail): Fact[] {
  const facts: Fact[] = [
    { icon: Clock, label: 'Duration', value: formatDuration(pkg.durationDays, pkg.durationNights) },
    {
      icon: MapPin,
      label: 'Starts and ends',
      value: pkg.startLocation === pkg.endLocation ? pkg.startLocation : `${pkg.startLocation} / ${pkg.endLocation}`,
    },
    { icon: Sun, label: 'Best time', value: pkg.bestTime },
    { icon: Gauge, label: 'Difficulty', value: DIFFICULTY_LABELS[pkg.difficulty] },
  ];
  if (pkg.maxAltitude) facts.push({ icon: MountainSnow, label: 'Highest point', value: pkg.maxAltitude });
  if (pkg.groupSize) facts.push({ icon: UsersRound, label: 'Group size', value: pkg.groupSize });
  return facts;
}

export function QuickFacts({ pkg }: { pkg: PackageDetail }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {buildFacts(pkg).map(({ icon: Icon, label, value }) => (
        <div key={label} className="relative rounded-2xl border border-stone-200 bg-white py-4 pl-[4.25rem] pr-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">
            <span className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-brand-50">
              <Icon aria-hidden="true" className="h-5 w-5 text-brand-700" />
            </span>
            {label}
          </dt>
          <dd className="mt-0.5 text-sm font-semibold text-ink-950">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
