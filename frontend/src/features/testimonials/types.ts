import type { PackageRef } from '@/features/packages/types';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  /** YYYY-MM */
  travelledOn: string;
  package: PackageRef | null;
}

export interface TestimonialListParams {
  featured?: boolean;
  /** Package slug */
  package?: string;
  limit?: number;
}
