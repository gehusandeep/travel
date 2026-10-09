import type { AppModule } from '@/core/module';
import { TestimonialController } from './testimonial.controller';
import type { PackageReferenceReader } from './testimonial.ports';
import type { TestimonialRepository } from './testimonial.repository';
import { createTestimonialRouter } from './testimonial.routes';
import { TestimonialService } from './testimonial.service';

export interface TestimonialModuleDeps {
  testimonialRepository: TestimonialRepository;
  packageReferences: PackageReferenceReader;
}

export function createTestimonialModule({ testimonialRepository, packageReferences }: TestimonialModuleDeps) {
  const service = new TestimonialService(testimonialRepository, packageReferences);
  const appModule: AppModule = {
    name: 'testimonials',
    basePath: '/testimonials',
    router: createTestimonialRouter(new TestimonialController(service)),
  };
  return { module: appModule, service };
}

export { StaticTestimonialRepository } from './testimonial.repository';
