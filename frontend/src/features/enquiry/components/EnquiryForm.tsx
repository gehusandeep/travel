'use client';

import { CircleCheck, LoaderCircle, Send } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/SocialIcons';
import { Button } from '@/components/ui/Button';
import { SelectField, TextAreaField, TextField } from '@/components/ui/form-fields';
import { whatsappUrl } from '@/lib/routes';
import { cn } from '@/lib/utils/cn';
import { useEnquiryForm } from '../hooks/useEnquiryForm';
import { useTravelMonthOptions } from '../hooks/useTravelMonthOptions';
import type { EnquiryReceipt, EnquirySource } from '../types';

export interface EnquiryFormProps {
  /** Unique per page, so field ids never collide when several forms are rendered. */
  idPrefix: string;
  source: EnquirySource;
  variant?: 'compact' | 'detailed';
  packageSlug?: string;
  packageTitle?: string;
  defaultMessage?: string;
  submitLabel?: string;
  className?: string;
  onSuccess?: (receipt: EnquiryReceipt) => void;
}

/** Lead form used in the hero, package sidebar, plan-a-trip section, contact page and modal. */
export function EnquiryForm({
  idPrefix,
  source,
  variant = 'compact',
  packageSlug,
  packageTitle,
  defaultMessage,
  submitLabel = 'Get a callback',
  className,
  onSuccess,
}: EnquiryFormProps) {
  const form = useEnquiryForm({ idPrefix, source, packageSlug, defaultMessage, onSuccess });
  const months = useTravelMonthOptions();
  const fieldId = (field: string) => `${idPrefix}-${field}`;
  const isDetailed = variant === 'detailed';

  if (form.receipt) {
    const firstName = form.values.name.trim().split(/\s+/)[0] ?? '';
    return (
      <div role="status" className={cn('rounded-2xl bg-emerald-50 p-6 text-center', className)}>
        <CircleCheck aria-hidden="true" className="mx-auto h-10 w-10 text-emerald-700" />
        <p className="mt-3 text-lg font-semibold text-ink-950">Thank you{firstName ? `, ${firstName}` : ''}!</p>
        <p className="mt-1 text-sm text-stone-700">
          Your enquiry reference is <strong className="text-ink-950">{form.receipt.reference}</strong>. A yatra
          expert will call you within 24 hours.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Button
            href={whatsappUrl(`Namaste! My enquiry reference is ${form.receipt.reference}.`)}
            target="_blank"
            variant="whatsapp"
            size="sm"
          >
            <WhatsappIcon className="h-4 w-4" />
            Chat on WhatsApp
          </Button>
          <Button variant="ghost" size="sm" onClick={form.reset}>
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={form.handleSubmit} className={cn('relative space-y-4', className)}>
      {packageTitle ? (
        <p className="rounded-xl bg-gold-50 px-3.5 py-2.5 text-sm text-ink-900">
          Enquiring about: <strong>{packageTitle}</strong>
        </p>
      ) : null}

      <TextField
        id={fieldId('name')}
        label="Full name"
        required
        autoComplete="name"
        value={form.values.name}
        onChange={(event) => form.setField('name', event.target.value)}
        error={form.errors.name}
      />

      <div className={cn('grid gap-4', isDetailed && 'sm:grid-cols-2')}>
        <TextField
          id={fieldId('phone')}
          type="tel"
          inputMode="tel"
          label="Phone / WhatsApp"
          required
          autoComplete="tel"
          value={form.values.phone}
          onChange={(event) => form.setField('phone', event.target.value)}
          error={form.errors.phone}
        />
        <TextField
          id={fieldId('email')}
          type="email"
          label="Email"
          required
          autoComplete="email"
          value={form.values.email}
          onChange={(event) => form.setField('email', event.target.value)}
          error={form.errors.email}
        />
      </div>

      {isDetailed ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <TextField
            id={fieldId('city')}
            label="City"
            autoComplete="address-level2"
            value={form.values.city}
            onChange={(event) => form.setField('city', event.target.value)}
            error={form.errors.city}
          />
          <SelectField
            id={fieldId('travelMonth')}
            label="Travel month"
            value={form.values.travelMonth}
            onChange={(event) => form.setField('travelMonth', event.target.value)}
            error={form.errors.travelMonth}
          >
            <option value="">Not decided yet</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </SelectField>
          <TextField
            id={fieldId('groupSize')}
            label="Travellers"
            inputMode="numeric"
            value={form.values.groupSize}
            onChange={(event) => form.setField('groupSize', event.target.value)}
            error={form.errors.groupSize}
          />
        </div>
      ) : null}

      <TextAreaField
        id={fieldId('message')}
        label={isDetailed ? 'Tell us about your plans' : 'Message'}
        rows={isDetailed ? 4 : 3}
        placeholder={isDetailed ? 'Destinations, dates, ages of travellers, any health needs…' : 'Preferred dates or questions'}
        value={form.values.message}
        onChange={(event) => form.setField('message', event.target.value)}
        error={form.errors.message}
      />

      {/* Honeypot: hidden from people and assistive technology, but bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor={fieldId('website')}>Website</label>
        <input
          id={fieldId('website')}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.values.website}
          onChange={(event) => form.setField('website', event.target.value)}
        />
      </div>

      {form.serverError ? (
        <p role="alert" className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
          {form.serverError}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={form.isSubmitting}>
        {form.isSubmitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="h-4 w-4" />
            {submitLabel}
          </>
        )}
      </Button>
      <p className="text-center text-xs text-stone-500">We respect your privacy. No spam, ever.</p>
    </form>
  );
}
