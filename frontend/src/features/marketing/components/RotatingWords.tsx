'use client';

import { useEffect, useState } from 'react';
import { formatList } from '@/lib/utils/format';

interface RotatingWordsProps {
  words: readonly string[];
  intervalMs?: number;
}

/**
 * Animated destination names in the hero (as on Nagarjuna Travels). Screen
 * readers and crawlers get the full static list; the animation is decorative
 * and stops for visitors who prefer reduced motion.
 */
export function RotatingWords({ words, intervalMs = 2600 }: RotatingWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), intervalMs);
    return () => window.clearInterval(timer);
  }, [words.length, intervalMs]);

  return (
    <>
      {/* Trailing space keeps the hidden list and the visible word apart in the page text. */}
      <span className="sr-only">{`${formatList(words)} `}</span>
      <span key={index} aria-hidden="true" className="inline-block animate-fade-up">
        {words[index]}
      </span>
    </>
  );
}
