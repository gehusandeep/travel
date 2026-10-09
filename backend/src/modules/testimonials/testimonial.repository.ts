import type { Testimonial } from './testimonial.types';

export interface TestimonialFilter {
  featured?: boolean;
  packageId?: string;
  limit: number;
}

export interface TestimonialRepository {
  list(filter: TestimonialFilter): Promise<Testimonial[]>;
}

export class StaticTestimonialRepository implements TestimonialRepository {
  private readonly testimonials: readonly Testimonial[];

  constructor(testimonials: readonly Testimonial[]) {
    this.testimonials = [...testimonials].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async list({ featured, packageId, limit }: TestimonialFilter): Promise<Testimonial[]> {
    return this.testimonials
      .filter(
        (item) =>
          (featured === undefined || item.isFeatured === featured) &&
          (!packageId || item.packageId === packageId),
      )
      .slice(0, limit);
  }
}
