import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { categoryService } from '@/features/categories/server/category.service';
import { withFallback } from '@/lib/http/with-fallback';

/**
 * Layout for paid-campaign landing pages. Each page renders its own focused
 * header (in-page anchors + CTA) instead of the full site navigation.
 */
export default async function LandingLayout({ children }: { children: ReactNode }) {
  const categories = await withFallback(categoryService.getTree(), [], 'category tree');

  return (
    <>
      {children}
      <SiteFooter categories={categories} />
    </>
  );
}
