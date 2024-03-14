import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const codeFilesApi = createApi({
  reducerPath: "codeFilesApi",
  tagTypes: ["CodeFiles"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/docs",
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.user.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCodeFiles: builder.query({
      query: () => "get-docs",
      providesTags: ["CodeFiles"],
    }),
    saveCodeFile: builder.mutation({
      query: (newCodeFile) => ({
        url: "save-doc",
        method: "POST",
        body: newCodeFile,
      }),
      invalidatesTags: ["CodeFiles"],
    }),
    deleteCodeFile: builder.mutation({
      query: (id) => ({
        url: "delete-doc",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["CodeFiles"],
    }),
  }),
});

export const {
  useGetCodeFilesQuery,
  useSaveCodeFileMutation,
  useDeleteCodeFileMutation,
} = codeFilesApi;
