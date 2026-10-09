import { Container } from '@/components/ui/Container';
import type { LegalDocument } from '@/content/legal';
import { formatDate } from '@/lib/utils/format';

/** Renders any policy document from content/legal.ts with consistent typography. */
export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm text-stone-500">
          Last updated: <time dateTime={doc.updatedAt}>{formatDate(doc.updatedAt)}</time>
        </p>
        <div className="mt-8 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-bold text-ink-950">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-stone-700">
                  {paragraph}
                </p>
              ))}
              {section.items ? (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-stone-700 marker:text-brand-700">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
