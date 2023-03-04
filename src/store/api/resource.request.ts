import { type Resource, type ApiResponse } from "../../types";
import { api } from "./api";

const request = api.injectEndpoints({
  endpoints: (builder) => ({
    getResource: builder.query<ApiResponse<Resource>, void>({
      query: () => `resource`,
    }),
  }),
});

export const { useGetResourceQuery } = request;
