import type { Response } from 'express';
import type { ErrorDetail } from '@/core/errors';
import type { PaginationMeta } from './pagination';

export interface SuccessBody<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ErrorDetail[];
    requestId?: string;
  };
}

interface SendOptions {
  status?: number;
  meta?: PaginationMeta;
}

/** Single place that defines the success envelope used by every endpoint. */
export function sendSuccess<T>(res: Response, data: T, { status = 200, meta }: SendOptions = {}) {
  const body: SuccessBody<T> = meta ? { success: true, data, meta } : { success: true, data };
  return res.status(status).json(body);
}

export function sendCreated<T>(res: Response, data: T) {
  return sendSuccess(res, data, { status: 201 });
}
