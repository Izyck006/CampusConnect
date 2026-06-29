import { configureStore } from '@reduxjs/toolkit';

const placeholderReducer = (state = { initialized: true }) => state;

export const store = configureStore({
  reducer: {
    app: placeholderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;