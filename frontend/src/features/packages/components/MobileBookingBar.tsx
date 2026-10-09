import { EnquiryButton } from '@/features/enquiry/components/EnquiryButton';
import { formatPrice } from '@/lib/utils/format';
import type { PackageSummary } from '../types';

/** Fixed price + call-to-action bar on small screens, where the sidebar sits far below. */
export function MobileBookingBar({ pkg }: { pkg: PackageSummary }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(18,17,46,0.08)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div>
          <p className="text-xs text-stone-500">From, {pkg.priceNote}</p>
          <p className="text-lg font-bold text-ink-950">{formatPrice(pkg.priceFrom)}</p>
        </div>
        <EnquiryButton packageSlug={pkg.slug} packageTitle={pkg.title} source="PACKAGE_PAGE">
          Enquire now
        </EnquiryButton>
      </div>
    </div>
  );
}
