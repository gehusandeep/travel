import { useEffect, useState } from 'react';
import { formatMonthYear } from '@/lib/utils/format';

/**
 * Next `count` months as select options. Computed after mount, so a page that
 * was statically rendered weeks ago never shows past months or causes a
 * hydration mismatch.
 */
export function useTravelMonthOptions(count = 12): string[] {
  const [months, setMonths] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();
    setMonths(
      Array.from({ length: count }, (_, index) => {
        const date = new Date(now.getFullYear(), now.getMonth() + index, 1);
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return formatMonthYear(yearMonth);
      }),
    );
  }, [count]);

  return months;
}
