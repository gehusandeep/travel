import type { AppModule } from '@/core/module';
import { FaqController } from './faq.controller';
import type { FaqRepository } from './faq.repository';
import { createFaqRouter } from './faq.routes';
import { FaqService } from './faq.service';

export interface FaqModuleDeps {
  faqRepository: FaqRepository;
}

export function createFaqModule({ faqRepository }: FaqModuleDeps) {
  const service = new FaqService(faqRepository);
  const appModule: AppModule = {
    name: 'faqs',
    basePath: '/faqs',
    router: createFaqRouter(new FaqController(service)),
  };
  return { module: appModule, service };
}

export { StaticFaqRepository } from './faq.repository';
