import { type ApiResponse, type Booking } from "../../types";
import { api } from "./api";
import { tags } from "./tags.constant";

interface PostBookingApiArgs {
  /**
   * Booking name
   */
  name: string;
  /**
   * Booking duration
   */
  duration: number;
}

interface DeleteBookingApiArgs {
  /**
   * Booking id
   */
  id: string;
}

/**
 * Initilisation of Endpoints related to bookings REST routes
 */
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
    deleteBooking: builder.mutation<ApiResponse<null>, DeleteBookingApiArgs>({
      query: (args) => ({
        url: `bookings/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.BOOKING],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  usePostBookingMutation,
  useDeleteBookingMutation,
} = request;
