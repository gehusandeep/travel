import type { Request, Response } from 'express';
import { buildPaginationMeta } from '@/core/http/pagination';
import { sendCreated, sendSuccess } from '@/core/http/response';
import { getAuthUser } from '@/core/middlewares';
import {
  createEnquirySchema,
  enquiryIdParamsSchema,
  enquiryListQuerySchema,
  updateEnquiryStatusSchema,
} from './enquiry.schema';
import type { EnquiryService } from './enquiry.service';

export class EnquiryController {
  constructor(private readonly service: EnquiryService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const input = createEnquirySchema.parse(req.body);
    const receipt = await this.service.create(input, {
      ip: req.ip,
      userAgent: req.get('user-agent')?.slice(0, 300),
    });
    sendCreated(res, receipt);
  };

  list = async (req: Request, res: Response): Promise<void> => {
    const query = enquiryListQuerySchema.parse(req.query);
    const { items, total } = await this.service.list(query);
    sendSuccess(res, items, { meta: buildPaginationMeta(query, total) });
  };

  updateStatus = async (req: Request, res: Response): Promise<void> => {
    const { id } = enquiryIdParamsSchema.parse(req.params);
    const input = updateEnquiryStatusSchema.parse(req.body);
    sendSuccess(res, await this.service.updateStatus(id, input, getAuthUser(req)));
  };
}
