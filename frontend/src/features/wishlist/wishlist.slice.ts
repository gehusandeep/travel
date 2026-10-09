import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const MAX_WISHLIST_ITEMS = 30;

export interface WishlistState {
  /** Package slugs, most recently saved first. */
  slugs: string[];
  /** True once the saved list has been read from localStorage. */
  hydrated: boolean;
}

const initialState: WishlistState = { slugs: [], hydrated: false };

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    wishlistHydrated(state, action: PayloadAction<string[]>) {
      state.slugs = [...new Set([...state.slugs, ...action.payload])].slice(0, MAX_WISHLIST_ITEMS);
      state.hydrated = true;
    },
    wishlistToggled(state, action: PayloadAction<string>) {
      const slug = action.payload;
      state.slugs = state.slugs.includes(slug)
        ? state.slugs.filter((item) => item !== slug)
        : [slug, ...state.slugs].slice(0, MAX_WISHLIST_ITEMS);
    },
    wishlistItemRemoved(state, action: PayloadAction<string>) {
      state.slugs = state.slugs.filter((item) => item !== action.payload);
    },
    wishlistCleared(state) {
      state.slugs = [];
    },
  },
  selectors: {
    selectWishlistSlugs: (state) => state.slugs,
    selectWishlistCount: (state) => state.slugs.length,
    selectWishlistHydrated: (state) => state.hydrated,
    selectIsWishlisted: (state, slug: string) => state.slugs.includes(slug),
  },
});

export const { wishlistHydrated, wishlistToggled, wishlistItemRemoved, wishlistCleared } =
  wishlistSlice.actions;

export const { selectWishlistSlugs, selectWishlistCount, selectWishlistHydrated, selectIsWishlisted } =
  wishlistSlice.selectors;
