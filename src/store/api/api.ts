import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "../store";
import { tags } from "./tags.constant";

export const api = createApi({
  reducerPath: "api",
  tagTypes: Object.values(tags),
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
});
