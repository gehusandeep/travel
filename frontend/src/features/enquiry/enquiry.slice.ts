import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EnquiryContext } from './types';

export interface EnquiryUiState {
  isModalOpen: boolean;
  context: EnquiryContext;
}

const initialState: EnquiryUiState = { isModalOpen: false, context: {} };

/** UI state for the global enquiry modal, so any button on any page can open it. */
export const enquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {
    enquiryModalOpened(state, action: PayloadAction<EnquiryContext | undefined>) {
      state.isModalOpen = true;
      state.context = action.payload ?? {};
    },
    enquiryModalClosed(state) {
      state.isModalOpen = false;
    },
  },
  selectors: {
    selectIsEnquiryModalOpen: (state) => state.isModalOpen,
    selectEnquiryContext: (state) => state.context,
  },
});

export const { enquiryModalOpened, enquiryModalClosed } = enquirySlice.actions;
export const { selectIsEnquiryModalOpen, selectEnquiryContext } = enquirySlice.selectors;
