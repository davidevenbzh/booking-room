import { type ApiResponse, type Booking } from "../../types";
import { api } from "./api";
import { tags } from "./tags.constant";

interface PostBookingApiArgs {
  name: string;
  duration: number;
}

const request = api.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<ApiResponse<Booking[]>, void>({
      query: () => "bookings",
      providesTags: [tags.BOOKING],
    }),
    postBooking: builder.mutation<
      ApiResponse<Partial<Booking>>,
      PostBookingApiArgs
    >({
      query: (args) => ({
        url: "bookings",
        body: args,
        method: "POST",
      }),
      invalidatesTags: [tags.BOOKING],
      transformResponse: (response: ApiResponse<{ bookingId: string }>) => ({
        ...response,
        data: {
          id: response.data?.bookingId ?? "",
        },
      }),
    }),
  }),
});

export const { useGetBookingsQuery, usePostBookingMutation } = request;
