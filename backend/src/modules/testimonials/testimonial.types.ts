import type { PackageRef } from '@/modules/packages/package.types';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  /** 1 to 5 */
  rating: number;
  title: string;
  content: string;
  packageId: string | null;
  /** Month of travel, YYYY-MM */
  travelledOn: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface TestimonialView {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  travelledOn: string;
  package: PackageRef | null;
}
