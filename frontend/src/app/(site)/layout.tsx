import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { categoryService } from '@/features/categories/server/category.service';
import { withFallback } from '@/lib/http/with-fallback';

/** Layout for the main website. The destination menu is built from the category API. */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const categories = await withFallback(categoryService.getTree(), [], 'category tree');

  return (
    <>
      <SkipLink />
      <SiteHeader categories={categories} />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <SiteFooter categories={categories} />
    </>
  );
}
