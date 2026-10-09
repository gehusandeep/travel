import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import type { BreadcrumbItem } from '@/lib/seo/json-ld';
import type { ImageAsset } from '@/types/api';

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  /** Decorative background photo. */
  image?: ImageAsset;
  children?: ReactNode;
}

/** Page banner with the page's single <h1>. */
export function PageHeader({ title, description, eyebrow, breadcrumbs, image, children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      {image ? (
        <Image src={image.url} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
      <Container className="py-12 sm:py-16 lg:py-20">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} tone="light" /> : null}
        {eyebrow ? (
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{description}</p> : null}
        {children}
      </Container>
    </section>
  );
}
