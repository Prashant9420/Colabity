import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "../features/user/editorSlice.tsx";
import authReducer from "../features/user/authSlice.tsx";
import { codeFilesApi } from "../services/api.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    editor: editorReducer,
    [codeFilesApi.reducerPath]: codeFilesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(codeFilesApi.middleware),
});

setupListeners(store.dispatch);
