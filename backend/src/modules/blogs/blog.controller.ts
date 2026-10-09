import type { Request, Response } from 'express';
import { buildPaginationMeta } from '@/core/http/pagination';
import { slugParamsSchema } from '@/core/http/query';
import { sendSuccess } from '@/core/http/response';
import { blogListQuerySchema } from './blog.schema';
import type { BlogService } from './blog.service';

export class BlogController {
  constructor(private readonly service: BlogService) {}

  list = async (req: Request, res: Response): Promise<void> => {
    const query = blogListQuerySchema.parse(req.query);
    const { items, total } = await this.service.list(query);
    sendSuccess(res, items, { meta: buildPaginationMeta(query, total) });
  };

  getBySlug = async (req: Request, res: Response): Promise<void> => {
    const { slug } = slugParamsSchema.parse(req.params);
    sendSuccess(res, await this.service.getBySlug(slug));
  };
}
