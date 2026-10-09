import { CalendarDays, CreditCard, Phone, Ticket } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/SocialIcons';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { EnquiryForm } from '@/features/enquiry/components/EnquiryForm';
import { whatsappUrl } from '@/lib/routes';
import { formatDateRange, formatPrice } from '@/lib/utils/format';
import type { PackageDetail } from '../types';

/** Sticky sidebar on the package page: price, quick contact and the enquiry form. */
export function BookingCard({ pkg }: { pkg: PackageDetail }) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-lg">
      <p className="text-sm text-stone-500">Starting from</p>
      <p className="text-3xl font-bold text-ink-950">{formatPrice(pkg.priceFrom)}</p>
      <p className="text-sm text-stone-500">{pkg.priceNote}</p>

      {pkg.nextDeparture ? (
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-stone-50 px-3 py-2 text-sm text-stone-700">
          <CalendarDays aria-hidden="true" className="h-4 w-4 text-brand-700" />
          Next batch:{' '}
          <strong className="text-ink-950">
            {formatDateRange(pkg.nextDeparture.startDate, pkg.nextDeparture.endDate)}
          </strong>
        </p>
      ) : null}

      {pkg.booking ? (
        <div className="mt-4 rounded-2xl border border-gold-200 bg-gold-50 p-4">
          <p className="flex gap-2 text-sm text-ink-950">
            <Ticket aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            <span>
              Reserve your seat with <strong>{formatPrice(pkg.booking.tokenAmount)}</strong> per person. The balance
              is paid at the start of the journey.
            </span>
          </p>
          {pkg.booking.paymentUrl ? (
            <Button href={pkg.booking.paymentUrl} target="_blank" size="sm" className="mt-3 w-full">
              <CreditCard aria-hidden="true" className="h-4 w-4" />
              Pay booking amount
              <span className="sr-only">(opens Razorpay in a new tab)</span>
            </Button>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button href={siteConfig.contact.phoneHref} variant="outline" size="sm">
          <Phone aria-hidden="true" className="h-4 w-4" />
          Call us
        </Button>
        <Button
          href={whatsappUrl(`Namaste! I am interested in "${pkg.title}". Please share details.`)}
          target="_blank"
          variant="whatsapp"
          size="sm"
        >
          <WhatsappIcon className="h-4 w-4" />
          WhatsApp
        </Button>
      </div>

      <hr className="my-6 border-stone-100" />
      <h2 className="text-lg font-semibold text-ink-950">Get the full itinerary and best price</h2>
      <EnquiryForm
        idPrefix="booking"
        source="PACKAGE_PAGE"
        packageSlug={pkg.slug}
        submitLabel="Send enquiry"
        className="mt-4"
      />
    </div>
  );
}
