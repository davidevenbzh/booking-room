import { type ApiResponse, type User } from "../../types";
import { api } from "./api";

/**
 * Initilisation of Endpoints related to user REST routes
 */
const request = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<ApiResponse<User>, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = request;
