import type { Request, Response } from 'express';
import { sendSuccess } from '@/core/http/response';
import { faqListQuerySchema } from './faq.schema';
import type { FaqService } from './faq.service';

export class FaqController {
  constructor(private readonly service: FaqService) {}

  list = async (req: Request, res: Response): Promise<void> => {
    const { topic } = faqListQuerySchema.parse(req.query);
    sendSuccess(res, await this.service.listGeneral(topic));
  };
}
