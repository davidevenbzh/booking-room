import { type ApiResponse, type User } from "../../types";
import { api } from "./api";

const request = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<ApiResponse<User>, void>({
      query: () => "me",
    }),
  }),
});

export const { useGetMeQuery } = request;
