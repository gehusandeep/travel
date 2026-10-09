import 'server-only';
import type { HttpClient } from '@/lib/http/http-client';
import { serverHttpClient } from '@/lib/http/server-client';
import type { Faq, FaqTopic } from '../types';

export function createFaqService(http: HttpClient) {
  return {
    async listGeneral(topic?: FaqTopic): Promise<Faq[]> {
      const { data } = await http.get<Faq[]>('/faqs', { query: { topic }, tags: ['faqs'] });
      return data;
    },
  };
}

export type FaqService = ReturnType<typeof createFaqService>;
export const faqService = createFaqService(serverHttpClient);
