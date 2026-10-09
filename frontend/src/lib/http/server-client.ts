import 'server-only';
import { serverEnv } from '@/config/server-env';
import { createHttpClient } from './http-client';

/** Shared client for Server Components, route handlers and metadata functions. */
export const serverHttpClient = createHttpClient({
  baseUrl: serverEnv.apiUrl,
  defaultRevalidate: serverEnv.revalidateSeconds,
});
