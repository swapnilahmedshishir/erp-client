import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    // product: productReducer,

    // sale: saleReducer,

    // dashboard: dashboardReducer,
  },

  devTools: import.meta.env.DEV,
});

/**
 * Root State
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * App Dispatch
 */
export type AppDispatch = typeof store.dispatch;
