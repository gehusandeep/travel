/**
 * Deterministic formatters. They avoid Intl date APIs so server-rendered HTML
 * always matches the client during hydration.
 */

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface DateParts {
  year: number;
  month: number;
  day: number;
}

function toDateParts(iso: string): DateParts {
  const [year = 1970, month = 1, day = 1] = iso.slice(0, 10).split('-').map(Number);
  return { year, month, day };
}

/** 2027-05-18 → "18 May 2027" */
export function formatDate(iso: string): string {
  const { year, month, day } = toDateParts(iso);
  return `${day} ${MONTHS_SHORT[month - 1] ?? ''} ${year}`;
}

/** "18–28 May 2027", "29 May – 2 Jun 2027" or "30 Dec 2026 – 3 Jan 2027" */
export function formatDateRange(startIso: string, endIso: string): string {
  const start = toDateParts(startIso);
  const end = toDateParts(endIso);
  const endMonth = MONTHS_SHORT[end.month - 1] ?? '';

  if (start.year !== end.year) return `${formatDate(startIso)} – ${formatDate(endIso)}`;
  if (start.month === end.month) return `${start.day}–${end.day} ${endMonth} ${end.year}`;
  return `${start.day} ${MONTHS_SHORT[start.month - 1] ?? ''} – ${end.day} ${endMonth} ${end.year}`;
}

/** "2026-06" → "June 2026" */
export function formatMonthYear(yearMonth: string): string {
  const [year, month = 1] = yearMonth.split('-').map(Number);
  return `${MONTHS_LONG[month - 1] ?? ''} ${year ?? ''}`.trim();
}

/** Indian digit grouping: 249000 → "2,49,000" */
export function formatIndianNumber(value: number): string {
  const digits = Math.round(Math.abs(value)).toString();
  const lastThree = digits.slice(-3);
  const rest = digits.slice(0, -3);
  const grouped = rest ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${lastThree}` : lastThree;
  return value < 0 ? `-${grouped}` : grouped;
}

export const formatPrice = (amount: number): string => `₹${formatIndianNumber(amount)}`;

export const formatDuration = (days: number, nights: number): string =>
  `${days} Days / ${nights} Nights`;

export const formatShortDuration = (days: number, nights: number): string => `${days}D / ${nights}N`;

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

/** ["a", "b", "c"] → "a, b and c" */
export function formatList(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}
