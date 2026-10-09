import { paginateArray, type Paginated } from '@/core/http/pagination';
import type { JsonFileStore } from '@/core/storage/json-file-store';
import { matchesSearch } from '@/core/utils/text';
import type { Enquiry, EnquiryStatus } from './enquiry.types';

export interface EnquiryListFilter {
  status?: EnquiryStatus;
  q?: string;
  page: number;
  limit: number;
}

export interface EnquiryRepository {
  create(enquiry: Enquiry): Promise<Enquiry>;
  list(filter: EnquiryListFilter): Promise<Paginated<Enquiry>>;
  findById(id: string): Promise<Enquiry | null>;
  /** Applies `change` to the stored enquiry. Returns null when the id does not exist. */
  update(id: string, change: (current: Enquiry) => Enquiry): Promise<Enquiry | null>;
}

/**
 * Persists enquiries to a JSON file so no lead is lost while the project runs
 * without a database. Newest enquiries are stored first.
 */
export class JsonFileEnquiryRepository implements EnquiryRepository {
  constructor(private readonly store: JsonFileStore<Enquiry[]>) {}

  async create(enquiry: Enquiry): Promise<Enquiry> {
    await this.store.update((current) => ({ next: [enquiry, ...current], result: undefined }));
    return enquiry;
  }

  async list({ status, q, page, limit }: EnquiryListFilter): Promise<Paginated<Enquiry>> {
    const enquiries = await this.store.read();
    const matches = enquiries.filter(
      (item) =>
        (!status || item.status === status) &&
        (!q ||
          matchesSearch(q, [item.reference, item.name, item.email, item.phone, item.package?.title ?? ''])),
    );
    return paginateArray(matches, { page, limit });
  }

  async findById(id: string): Promise<Enquiry | null> {
    const enquiries = await this.store.read();
    return enquiries.find((item) => item.id === id) ?? null;
  }

  async update(id: string, change: (current: Enquiry) => Enquiry): Promise<Enquiry | null> {
    return this.store.update((current) => {
      const index = current.findIndex((item) => item.id === id);
      const existing = current[index];
      if (!existing) return { next: current, result: null };

      const updated = change(existing);
      const next = [...current];
      next[index] = updated;
      return { next, result: updated };
    });
  }
}
