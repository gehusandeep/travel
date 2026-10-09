import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  wishlistCleared,
  wishlistItemRemoved,
  wishlistToggled,
  type WishlistState,
} from './wishlist.slice';
import { writeStoredWishlist } from './wishlist.storage';

/** Saves the wishlist to localStorage whenever the user changes it. */
export function createWishlistPersistence() {
  const listener = createListenerMiddleware();

  listener.startListening({
    matcher: isAnyOf(wishlistToggled, wishlistItemRemoved, wishlistCleared),
    effect: (_action, api) => {
      const { wishlist } = api.getState() as { wishlist: WishlistState };
      writeStoredWishlist(wishlist.slugs);
    },
  });

  return listener;
}
