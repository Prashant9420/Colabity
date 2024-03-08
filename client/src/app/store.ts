import { configureStore } from "@reduxjs/toolkit";
import editorReducer from '../features/user/editorSlice.tsx'
import authReducer from "../features/user/authSlice.tsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    editor:editorReducer
  },
});
