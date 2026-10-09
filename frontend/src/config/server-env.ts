import 'server-only';
import { publicEnv } from './env';

const revalidateSeconds = Number.parseInt(process.env.REVALIDATE_SECONDS ?? '', 10);

/** Server-only settings. Importing this from a client component fails the build. */
export const serverEnv = {
  apiUrl: (process.env.API_URL || publicEnv.apiUrl).replace(/\/+$/, ''),
  revalidateSeconds: Number.isFinite(revalidateSeconds) && revalidateSeconds > 0 ? revalidateSeconds : 300,
} as const;
