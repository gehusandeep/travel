import type { AppLogger } from '@/core/logger/logger';
import type { Enquiry } from './enquiry.types';

/**
 * Strategy for telling the team about a new lead. Add email, WhatsApp or CRM
 * notifiers by implementing this interface; EnquiryService stays unchanged.
 */
export interface EnquiryNotifier {
  notify(enquiry: Enquiry): Promise<void>;
}

/** Logs the lead without personal data. Default notifier until email/WhatsApp is set up. */
export class LogEnquiryNotifier implements EnquiryNotifier {
  constructor(private readonly logger: AppLogger) {}

  async notify(enquiry: Enquiry): Promise<void> {
    this.logger.info(
      {
        enquiryId: enquiry.id,
        reference: enquiry.reference,
        source: enquiry.source,
        package: enquiry.package?.slug,
      },
      'New enquiry received',
    );
  }
}

/** Fans out to several notifiers. One failing channel never blocks the others. */
export class CompositeEnquiryNotifier implements EnquiryNotifier {
  constructor(private readonly notifiers: readonly EnquiryNotifier[]) {}

  async notify(enquiry: Enquiry): Promise<void> {
    await Promise.allSettled(this.notifiers.map((notifier) => notifier.notify(enquiry)));
  }
}
