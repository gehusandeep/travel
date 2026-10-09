import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { enquirySlice } from '@/features/enquiry/enquiry.slice';
import { createWishlistPersistence } from '@/features/wishlist/wishlist.persistence';
import { wishlistSlice } from '@/features/wishlist/wishlist.slice';
import { baseApi } from './baseApi';

/** Slices are registered here; feature modules own their reducers and selectors. */
const rootReducer = combineSlices(baseApi, enquirySlice, wishlistSlice);

export type RootState = ReturnType<typeof rootReducer>;

/**
 * Creates a fresh store. Called once per request on the server and once per
 * browser session, so no state leaks between users (Next.js App Router pattern).
 */
export function makeStore() {
  const wishlistPersistence = createWishlistPersistence();

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(wishlistPersistence.middleware).concat(baseApi.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
