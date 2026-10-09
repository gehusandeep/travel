import type { JsonLdObject } from '@/lib/seo/json-ld';

interface JsonLdProps {
  data: JsonLdObject;
}

/**
 * Renders schema.org structured data. "<" is escaped so the JSON can never
 * close the script tag, which keeps this safe even with user-provided text.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
