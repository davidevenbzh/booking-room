import { type ApiResponse, type Booking } from "../../types";
import { api } from "./api";

const request = api.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<ApiResponse<Booking[]>, void>({
      query: () => `bookings`,
    }),
  }),
});

export const { useGetBookingsQuery } = request;
