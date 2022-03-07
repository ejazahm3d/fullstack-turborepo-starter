import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "api",
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    hello: builder.query<{ message: string }, void>({
      query: () => ({
        url: "/",
      }),
    }),
  }),
});

export const { useHelloQuery } = api;
