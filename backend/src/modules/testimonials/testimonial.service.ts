import type { PackageReferenceReader } from './testimonial.ports';
import type { TestimonialRepository } from './testimonial.repository';
import type { TestimonialListQuery } from './testimonial.schema';
import type { TestimonialView } from './testimonial.types';

export class TestimonialService {
  constructor(
    private readonly repository: TestimonialRepository,
    private readonly packages: PackageReferenceReader,
  ) {}

  async list({ featured, package: packageSlug, limit }: TestimonialListQuery): Promise<TestimonialView[]> {
    let packageId: string | undefined;
    if (packageSlug) {
      const ref = await this.packages.findRefBySlug(packageSlug);
      if (!ref) return [];
      packageId = ref.id;
    }

    const testimonials = await this.repository.list({ featured, packageId, limit });
    const packageIds = [
      ...new Set(testimonials.flatMap((item) => (item.packageId ? [item.packageId] : []))),
    ];
    const refs = new Map((await this.packages.findRefsByIds(packageIds)).map((ref) => [ref.id, ref]));

    return testimonials.map((item) => ({
      id: item.id,
      name: item.name,
      location: item.location,
      rating: item.rating,
      title: item.title,
      content: item.content,
      travelledOn: item.travelledOn,
      package: item.packageId ? (refs.get(item.packageId) ?? null) : null,
    }));
  }
}
