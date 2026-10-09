import 'server-only';
import type { HttpClient } from '@/lib/http/http-client';
import { serverHttpClient } from '@/lib/http/server-client';
import type { Testimonial, TestimonialListParams } from '../types';

export function createTestimonialService(http: HttpClient) {
  return {
    async list(params: TestimonialListParams = {}): Promise<Testimonial[]> {
      const { data } = await http.get<Testimonial[]>('/testimonials', {
        query: params,
        tags: ['testimonials'],
      });
      return data;
    },
  };
}

export type TestimonialService = ReturnType<typeof createTestimonialService>;
export const testimonialService = createTestimonialService(serverHttpClient);
