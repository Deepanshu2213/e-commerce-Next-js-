import { configureStore } from '@reduxjs/toolkit';
import { CartApi } from './api/Cart';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [CartApi.reducerPath]: CartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CartApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type loginDispatch = typeof store.dispatch;
export * from './api/Cart';
