import { type ApiResponse } from "../../types";
import type Resource from "../../types/room";
import { api } from "./api";

const request = api.injectEndpoints({
  endpoints: (builder) => ({
    getResource: builder.query<ApiResponse<Resource>, void>({
      query: () => `resource`,
    }),
  }),
});

export const { useGetResourceQuery } = request;
