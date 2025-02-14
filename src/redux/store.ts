import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { postApi } from "./services/postApi";

export const store = configureStore({
  reducer: {
    userFeature: userReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([postApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
