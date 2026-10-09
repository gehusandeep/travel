import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { publicEnv } from '@/config/env';

/**
 * The single RTK Query API slice. Each feature adds its own endpoints with
 * `baseApi.injectEndpoints`, so new features never modify this file.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: publicEnv.apiUrl }),
  tagTypes: ['Package', 'Departure'],
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
