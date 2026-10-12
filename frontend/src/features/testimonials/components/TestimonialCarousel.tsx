'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Testimonial } from '../types';
import { TestimonialCard } from './TestimonialCard';

const CARD_GAP_PX = 24;

/** Scroll-snap carousel: works with touch, trackpad and keyboard, buttons are a bonus. */
export function TestimonialCarousel({ testimonials, label = 'Pilgrim reviews' }: { testimonials: Testimonial[]; label?: string }) {
  const listRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    const card = list.querySelector('li');
    const distance = card ? card.getBoundingClientRect().width + CARD_GAP_PX : list.clientWidth * 0.8;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollBy({ left: distance * direction, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  if (testimonials.length === 0) return null;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={listRef}
        className="scrollbar-none relative -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0"
      >
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.id}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%_-_12px)] lg:w-[calc(33.333%_-_16px)]"
          >
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>
      {testimonials.length > 1 ? (
        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous reviews"
            className="grid h-11 w-11 place-items-center rounded-full border border-stone-300 bg-white text-ink-950 transition-colors hover:bg-stone-100"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next reviews"
            className="grid h-11 w-11 place-items-center rounded-full border border-stone-300 bg-white text-ink-950 transition-colors hover:bg-stone-100"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
