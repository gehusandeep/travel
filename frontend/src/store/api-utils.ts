import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ApiErrorDetail, ApiFailure, ApiSuccess, Paginated } from '@/types/api';

export const unwrapData = <T>(response: ApiSuccess<T>): T => response.data;

export const unwrapPage = <T>(response: ApiSuccess<T[]>): Paginated<T> => ({
  items: response.data,
  meta: response.meta ?? {
    page: 1,
    limit: response.data.length,
    total: response.data.length,
    totalPages: 1,
  },
});

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
  typeof error === 'object' && error !== null && 'status' in error;

const isApiFailure = (value: unknown): value is ApiFailure =>
  typeof value === 'object' &&
  value !== null &&
  (value as ApiFailure).success === false &&
  typeof (value as ApiFailure).error?.message === 'string';

const hasMessage = (error: unknown): error is { message: string } =>
  typeof error === 'object' && error !== null && typeof (error as { message?: unknown }).message === 'string';

/** Human-readable message for any RTK Query error (or anything thrown by `.unwrap()`). */
export function getErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (!error) return fallback;

  if (isFetchBaseQueryError(error)) {
    if (error.status === 'FETCH_ERROR') {
      return 'We could not reach our server. Please check your connection and try again.';
    }
    return isApiFailure(error.data) ? error.data.error.message : fallback;
  }
  return hasMessage(error) ? error.message : fallback;
}

/** Field-level validation errors returned by the API, if any. */
export function getErrorDetails(error: unknown): ApiErrorDetail[] {
  if (isFetchBaseQueryError(error) && isApiFailure(error.data)) return error.data.error.details ?? [];
  return [];
}
