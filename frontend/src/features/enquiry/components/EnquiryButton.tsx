'use client';

import type { ReactNode } from 'react';
import { Button, type ButtonSize, type ButtonVariant } from '@/components/ui/Button';
import { useAppDispatch } from '@/store/hooks';
import { enquiryModalOpened } from '../enquiry.slice';
import type { EnquirySource } from '../types';

interface EnquiryButtonProps {
  children: ReactNode;
  packageSlug?: string;
  packageTitle?: string;
  source?: EnquirySource;
  /** Pre-fills the message field, e.g. "I am interested in batch KMH-2701". */
  message?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Opens the global enquiry modal. Safe to drop into Server Components. */
export function EnquiryButton({
  children,
  packageSlug,
  packageTitle,
  source = 'ENQUIRY_MODAL',
  message,
  variant,
  size,
  className,
}: EnquiryButtonProps) {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      aria-haspopup="dialog"
      onClick={() => dispatch(enquiryModalOpened({ packageSlug, packageTitle, source, message }))}
    >
      {children}
    </Button>
  );
}
