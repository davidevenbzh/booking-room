import { type Resource, type ApiResponse } from "../../types";
import { api } from "./api";

/**
 * Initilisation of Endpoints related to resource REST routes
 */
const request = api.injectEndpoints({
  endpoints: (builder) => ({
    getResource: builder.query<ApiResponse<Resource>, void>({
      query: () => `resource`,
    }),
  }),
});

export const { useGetResourceQuery } = request;
