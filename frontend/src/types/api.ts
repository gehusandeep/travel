/** Shapes shared with the backend API. Keep in sync with backend/src/core/http. */

export interface ImageAsset {
  url: string;
  alt: string;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiErrorDetail {
  path?: string;
  message: string;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiFailure {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
    requestId?: string;
  };
}

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

export interface Paginated<T> {
  items: T[];
  meta: PaginationMeta;
}

export const emptyPage = <T>(): Paginated<T> => ({
  items: [],
  meta: { page: 1, limit: 0, total: 0, totalPages: 1 },
});
