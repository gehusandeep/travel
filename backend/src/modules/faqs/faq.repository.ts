import type { Faq, FaqTopic } from './faq.types';

export interface FaqRepository {
  findGeneral(topic?: FaqTopic): Promise<Faq[]>;
  findByPackageId(packageId: string): Promise<Faq[]>;
}

export class StaticFaqRepository implements FaqRepository {
  private readonly faqs: readonly Faq[];

  constructor(faqs: readonly Faq[]) {
    this.faqs = [...faqs].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async findGeneral(topic?: FaqTopic): Promise<Faq[]> {
    return this.faqs.filter((faq) => faq.packageId === null && (!topic || faq.topic === topic));
  }

  async findByPackageId(packageId: string): Promise<Faq[]> {
    return this.faqs.filter((faq) => faq.packageId === packageId);
  }
}
