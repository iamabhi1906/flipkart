'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { CartProvider } from '@/context/cart-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartProvider>
        {children}
      </CartProvider>
    </Provider>
  );
}