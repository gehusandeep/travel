import { randomBytes, randomUUID } from 'node:crypto';
import { NotFoundError } from '@/core/errors';
import type { Paginated } from '@/core/http/pagination';
import type { AppLogger } from '@/core/logger/logger';
import type { AuthPrincipal } from '@/core/security/types';
import { systemClock, type Clock } from '@/core/time/clock';
import type { EnquiryNotifier } from './enquiry.notifier';
import type { PackageLookup } from './enquiry.ports';
import type { EnquiryRepository } from './enquiry.repository';
import type { CreateEnquiryInput, EnquiryListQuery, UpdateEnquiryStatusInput } from './enquiry.schema';
import type { Enquiry, EnquiryReceipt, UtmParams } from './enquiry.types';

export interface RequestContext {
  ip?: string;
  userAgent?: string;
}

/** Customer-friendly reference such as ENQ-261009-7F2A. */
function createReference(date: Date): string {
  const stamp = date.toISOString().slice(2, 10).replace(/-/g, '');
  const suffix = randomBytes(2).toString('hex').toUpperCase();
  return `ENQ-${stamp}-${suffix}`;
}

function compactUtm(utm: UtmParams | undefined): UtmParams | undefined {
  if (!utm) return undefined;
  const entries = Object.entries(utm).filter(([, value]) => Boolean(value));
  return entries.length > 0 ? (Object.fromEntries(entries) as UtmParams) : undefined;
}

export class EnquiryService {
  constructor(
    private readonly repository: EnquiryRepository,
    private readonly packages: PackageLookup,
    private readonly notifier: EnquiryNotifier,
    private readonly logger: AppLogger,
    private readonly clock: Clock = systemClock,
  ) {}

  async create(input: CreateEnquiryInput, context: RequestContext): Promise<EnquiryReceipt> {
    const now = this.clock.now();
    const receipt: EnquiryReceipt = {
      id: randomUUID(),
      reference: createReference(now),
      createdAt: now.toISOString(),
    };

    // Honeypot filled: reply as if it worked so bots learn nothing, but store nothing.
    if (input.website) {
      this.logger.warn({ ip: context.ip }, 'Discarded enquiry because the honeypot field was filled');
      return receipt;
    }

    // An unknown package slug must never cost us the lead, so it is simply ignored.
    const pkg = input.packageSlug ? await this.packages.findRefBySlug(input.packageSlug) : null;

    const enquiry: Enquiry = {
      ...receipt,
      name: input.name,
      email: input.email,
      phone: input.phone,
      city: input.city,
      message: input.message,
      travelMonth: input.travelMonth,
      groupSize: input.groupSize,
      package: pkg ?? undefined,
      source: input.source,
      status: 'NEW',
      utm: compactUtm(input.utm),
      pageUrl: input.pageUrl,
      client: { ip: context.ip, userAgent: context.userAgent },
      history: [{ at: receipt.createdAt, status: 'NEW', by: 'website' }],
      updatedAt: receipt.createdAt,
    };

    await this.repository.create(enquiry);

    // Notifications run in the background and can never fail the visitor's request.
    void this.notifier
      .notify(enquiry)
      .catch((error: unknown) =>
        this.logger.error({ err: error, enquiryId: enquiry.id }, 'Enquiry notification failed'),
      );

    return receipt;
  }

  list(query: EnquiryListQuery): Promise<Paginated<Enquiry>> {
    return this.repository.list(query);
  }

  async updateStatus(
    id: string,
    { status, note }: UpdateEnquiryStatusInput,
    actor: AuthPrincipal,
  ): Promise<Enquiry> {
    const at = this.clock.now().toISOString();
    const updated = await this.repository.update(id, (current) => ({
      ...current,
      status,
      updatedAt: at,
      history: [...current.history, { at, status, by: actor.email, note }],
    }));

    if (!updated) throw new NotFoundError('Enquiry');
    return updated;
  }
}
