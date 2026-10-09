import { Quote } from 'lucide-react';
import Link from 'next/link';
import { RatingStars } from '@/components/ui/RatingStars';
import { routes } from '@/lib/routes';
import { formatMonthYear, initials } from '@/lib/utils/format';
import type { Testimonial } from '../types';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <Quote aria-hidden="true" className="h-8 w-8 text-gold-400" />
      <RatingStars rating={testimonial.rating} className="mt-4" />
      <p className="mt-3 font-semibold text-ink-950">{testimonial.title}</p>
      <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-stone-700">
        <p>{testimonial.content}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-stone-100 pt-4">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 font-semibold text-brand-800"
        >
          {initials(testimonial.name)}
        </span>
        <span className="text-sm">
          <span className="block font-semibold text-ink-950">{testimonial.name}</span>
          <span className="block text-stone-500">
            {testimonial.location} · Travelled {formatMonthYear(testimonial.travelledOn)}
          </span>
          {testimonial.package ? (
            <Link
              href={routes.package(testimonial.package.slug)}
              className="mt-1 block text-xs font-medium text-brand-700 hover:underline"
            >
              {testimonial.package.title}
            </Link>
          ) : null}
        </span>
      </figcaption>
    </figure>
  );
}
