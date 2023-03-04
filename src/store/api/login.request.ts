import { type Token, type ApiResponse } from "../../types";
import { api } from "./api";

const request = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<ApiResponse<Token>, void>({
      query: () => `login`,
    }),
  }),
});

export const { useLoginQuery } = request;
