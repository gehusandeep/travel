import { Disclosure } from '@/components/ui/Disclosure';
import { cn } from '@/lib/utils/cn';
import type { Faq } from '../types';

/** FAQ accordion. Pair with faqPageJsonLd() on the page for structured data. */
export function FaqList({ faqs, className }: { faqs: readonly Faq[]; className?: string }) {
  if (faqs.length === 0) return null;

  return (
    <ul className={cn('space-y-3', className)}>
      {faqs.map((faq) => (
        <li key={faq.id}>
          <Disclosure summary={faq.question}>
            <p>{faq.answer}</p>
          </Disclosure>
        </li>
      ))}
    </ul>
  );
}
