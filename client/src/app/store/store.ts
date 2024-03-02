import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/user/authSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
