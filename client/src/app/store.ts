import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/authSlice.tsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
