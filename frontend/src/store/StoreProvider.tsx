'use client';

import { setupListeners } from '@reduxjs/toolkit/query';
import { useEffect, useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { wishlistHydrated } from '@/features/wishlist/wishlist.slice';
import { readStoredWishlist } from '@/features/wishlist/wishlist.storage';
import { makeStore, type AppStore } from './store';

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return undefined;

    // Browser-only state is restored after hydration to keep server and client HTML identical.
    store.dispatch(wishlistHydrated(readStoredWishlist()));
    return setupListeners(store.dispatch);
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
