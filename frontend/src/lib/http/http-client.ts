import type { ApiEnvelope, PaginationMeta } from '@/types/api';
import { ApiError } from './api-error';
import { buildQueryString } from './query';

export interface RequestOptions {
  /** Query parameters. Empty values are dropped and arrays are comma-joined. */
  query?: object;
  /** Seconds before the cached response is refreshed (ISR). `false` caches until revalidated by tag. */
  revalidate?: number | false;
  /** Cache tags, so content can later be refreshed on demand with revalidateTag(). */
  tags?: string[];
}

export interface HttpResult<T> {
  data: T;
  meta?: PaginationMeta;
}

/** Abstraction the server-side services depend on (dependency inversion). */
export interface HttpClient {
  get<T>(path: string, options?: RequestOptions): Promise<HttpResult<T>>;
}

interface HttpClientConfig {
  baseUrl: string;
  defaultRevalidate: number;
}

/** fetch-based client that unwraps the API envelope and plugs into the Next.js data cache. */
export function createHttpClient({ baseUrl, defaultRevalidate }: HttpClientConfig): HttpClient {
  return {
    async get<T>(path: string, { query, revalidate = defaultRevalidate, tags }: RequestOptions = {}) {
      const url = `${baseUrl}${path}${buildQueryString(query)}`;

      let response: Response;
      try {
        response = await fetch(url, {
          headers: { Accept: 'application/json' },
          next: { revalidate, tags },
        });
      } catch {
        throw new ApiError(`Could not reach the API at ${baseUrl}`, 503, 'NETWORK_ERROR');
      }

      const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

      if (!body) {
        throw new ApiError(`Unexpected response from ${path} (${response.status})`, response.status || 502);
      }
      if (!body.success) {
        throw new ApiError(body.error.message, response.status, body.error.code, body.error.details);
      }
      return { data: body.data, meta: body.meta };
    },
  };
}
