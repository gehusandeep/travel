import type { Request, Response } from 'express';
import { slugParamsSchema } from '@/core/http/query';
import { sendSuccess } from '@/core/http/response';
import type { CategoryService } from './category.service';

export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  getTree = async (_req: Request, res: Response): Promise<void> => {
    sendSuccess(res, await this.service.getTree());
  };

  getBySlug = async (req: Request, res: Response): Promise<void> => {
    const { slug } = slugParamsSchema.parse(req.params);
    sendSuccess(res, await this.service.getDetail(slug));
  };
}
