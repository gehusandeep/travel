import { unwrapData } from '@/store/api-utils';
import { baseApi } from '@/store/baseApi';
import type { ApiSuccess } from '@/types/api';
import type { EnquiryPayload, EnquiryReceipt } from '../types';

export const enquiryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEnquiry: build.mutation<EnquiryReceipt, EnquiryPayload>({
      query: (body) => ({ url: '/enquiries', method: 'POST', body }),
      transformResponse: (response: ApiSuccess<EnquiryReceipt>) => unwrapData(response),
    }),
  }),
});

export const { useCreateEnquiryMutation } = enquiryApi;
