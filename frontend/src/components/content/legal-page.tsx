import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import type { LegalDocument } from '@/content/legal';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';
import { LegalDocumentView } from './LegalDocumentView';

/**
 * Builds the metadata and page component for a policy document, so every legal
 * page shares one implementation and adding a new policy is a three-line file.
 */
export function createLegalPage(doc: LegalDocument, path: string) {
  const breadcrumbs = [
    { name: 'Home', path: routes.home },
    { name: doc.title, path },
  ];

  const metadata: Metadata = buildMetadata({ title: doc.title, description: doc.description, path });

  function LegalPage() {
    return (
      <>
        <PageHeader eyebrow="Policies" title={doc.title} description={doc.description} breadcrumbs={breadcrumbs} />
        <LegalDocumentView doc={doc} />
        <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      </>
    );
  }

  return { metadata, Page: LegalPage };
}
