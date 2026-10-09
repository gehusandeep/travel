import type { Request, Response } from 'express';
import { sendSuccess } from '@/core/http/response';
import { testimonialListQuerySchema } from './testimonial.schema';
import type { TestimonialService } from './testimonial.service';

export class TestimonialController {
  constructor(private readonly service: TestimonialService) {}

  list = async (req: Request, res: Response): Promise<void> => {
    const query = testimonialListQuerySchema.parse(req.query);
    sendSuccess(res, await this.service.list(query));
  };
}
