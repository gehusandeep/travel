import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError, type ErrorDetail } from '@/core/errors';
import type { ErrorBody } from '@/core/http/response';
import { logger } from '@/core/logger/logger';

/** Shape of errors thrown by body-parser and other http-errors based libraries. */
interface HttpLikeError {
  type?: string;
}

const toDetails = (error: ZodError): ErrorDetail[] =>
  error.issues.map((issue) => ({
    path: issue.path.map(String).join('.') || undefined,
    message: issue.message,
  }));

/**
 * Translates any thrown error into the standard error envelope.
 * Express 5 forwards rejected promises from async handlers here automatically.
 */
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const requestId = req.id === undefined ? undefined : String(req.id);

  const send = (status: number, body: Omit<ErrorBody['error'], 'requestId'>) => {
    const payload: ErrorBody = { success: false, error: { ...body, requestId } };
    res.status(status).json(payload);
  };

  if (error instanceof ZodError) {
    send(400, {
      code: 'VALIDATION_ERROR',
      message: 'Some fields are invalid',
      details: toDetails(error),
    });
    return;
  }

  if (error instanceof AppError) {
    if (error.statusCode >= 500) logger.error({ err: error, requestId }, error.message);
    send(error.statusCode, { code: error.code, message: error.message, details: error.details });
    return;
  }

  const httpError = error as HttpLikeError | undefined;
  if (httpError?.type === 'entity.parse.failed') {
    send(400, { code: 'BAD_REQUEST', message: 'Malformed JSON body' });
    return;
  }
  if (httpError?.type === 'entity.too.large') {
    send(413, { code: 'PAYLOAD_TOO_LARGE', message: 'Request body is too large' });
    return;
  }

  logger.error({ err: error, requestId }, 'Unhandled error');
  send(500, { code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again later.' });
};
