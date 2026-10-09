import type { FaqRepository } from './faq.repository';
import type { Faq, FaqTopic, FaqView } from './faq.types';

const toFaqView = ({ id, question, answer, topic }: Faq): FaqView => ({ id, question, answer, topic });

export class FaqService {
  constructor(private readonly repository: FaqRepository) {}

  async listGeneral(topic?: FaqTopic): Promise<FaqView[]> {
    return (await this.repository.findGeneral(topic)).map(toFaqView);
  }

  /** Satisfies the packages module's `PackageFaqReader` port. */
  async findByPackageId(packageId: string): Promise<FaqView[]> {
    return (await this.repository.findByPackageId(packageId)).map(toFaqView);
  }
}
