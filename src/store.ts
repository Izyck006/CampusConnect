import { configureStore } from '@reduxjs/toolkit';

// A simple placeholder reducer to prevent Redux from crashing on an empty object
const placeholderReducer = (state = { initialized: true }) => state;

export const store = configureStore({
  reducer: {
    app: placeholderReducer,
    // As you create your real slices (like authSlice or chatSlice), 
    // you can wire them in right here:
    // auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;