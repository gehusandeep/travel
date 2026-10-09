'use client';

import { X } from 'lucide-react';
import { useEffect, useId, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { enquiryModalClosed, selectEnquiryContext, selectIsEnquiryModalOpen } from '../enquiry.slice';
import { EnquiryForm } from './EnquiryForm';

/**
 * One global enquiry dialog, opened from anywhere via the enquiry slice.
 * Uses the native <dialog> element for focus trapping, Escape and focus return.
 */
export function EnquiryModal() {
  const isOpen = useAppSelector(selectIsEnquiryModalOpen);
  const context = useAppSelector(selectEnquiryContext);
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();

    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => dispatch(enquiryModalClosed())}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100vw-2rem))] overflow-y-auto rounded-3xl bg-white p-0 text-ink-950 shadow-2xl backdrop:bg-ink-950/70"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="font-display text-2xl font-bold text-ink-950">
              Plan your yatra
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Share a few details and a yatra expert will call you back within 24 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-stone-600 transition-colors hover:bg-stone-100"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {isOpen ? (
          <EnquiryForm
            key={`${context.packageSlug ?? 'general'}:${context.message ?? ''}`}
            idPrefix="modal"
            source={context.source ?? 'ENQUIRY_MODAL'}
            packageSlug={context.packageSlug}
            packageTitle={context.packageTitle}
            defaultMessage={context.message}
            className="mt-6"
          />
        ) : null}
      </div>
    </dialog>
  );
}
