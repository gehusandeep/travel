import type { ApiErrorDetail } from '@/types/api';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code = 'UNKNOWN',
    readonly details: ApiErrorDetail[] = [],
  ) {
    super(message);
    this.name = 'ApiError';
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }
}

export const isNotFoundError = (error: unknown): boolean =>
  error instanceof ApiError && error.isNotFound;
