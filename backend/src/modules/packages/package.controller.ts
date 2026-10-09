import type { Request, Response } from 'express';
import { buildPaginationMeta } from '@/core/http/pagination';
import { slugParamsSchema } from '@/core/http/query';
import { sendSuccess } from '@/core/http/response';
import { packageListQuerySchema, relatedPackagesQuerySchema } from './package.schema';
import type { PackageService } from './package.service';

/** Translates HTTP requests into service calls. No business logic lives here. */
export class PackageController {
  constructor(private readonly service: PackageService) {}

  list = async (req: Request, res: Response): Promise<void> => {
    const query = packageListQuerySchema.parse(req.query);
    const { items, total } = await this.service.list(query);
    sendSuccess(res, items, { meta: buildPaginationMeta(query, total) });
  };

  getBySlug = async (req: Request, res: Response): Promise<void> => {
    const { slug } = slugParamsSchema.parse(req.params);
    sendSuccess(res, await this.service.getBySlug(slug));
  };

  getDepartures = async (req: Request, res: Response): Promise<void> => {
    const { slug } = slugParamsSchema.parse(req.params);
    sendSuccess(res, await this.service.getDepartures(slug));
  };

  getRelated = async (req: Request, res: Response): Promise<void> => {
    const { slug } = slugParamsSchema.parse(req.params);
    const { limit } = relatedPackagesQuerySchema.parse(req.query);
    sendSuccess(res, await this.service.getRelated(slug, limit));
  };
}
