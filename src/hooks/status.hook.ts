import { compareAsc, compareDesc, differenceInMinutes } from "date-fns";
import React from "react";
import {
  useGetUserByIdQuery,
  useGetBookingsQuery,
  useGetResourceQuery,
} from "../store";

/**
 * A hook to get user info with user id
 * @param {string} userId
 * @returns
 * ```ts
 * occupiedBy?: string
 * ```
 */
const useOccupiedBy = (userId: string) => {
  const { data } = useGetUserByIdQuery(userId, { skip: userId.length === 0 });

  const occupiedBy = React.useMemo(() => {
    if (data?.success) {
      return data?.data?.name;
    }
  }, [data]);

  return occupiedBy;
};

/**
 * A hook to get infos about current room status
 * @returns
 * ```ts
 * {
 *  isLoading: boolean;
    occupiedBy?: string;
    currentMeetName?: string;
    isAvailable: boolean;
    currentAvailableDurations: number[];
 * }
 * ```
 */
export const useStatus = () => {
  const { data: resourceResponse } = useGetResourceQuery();
  const { data: bookingsResponse, isLoading } = useGetBookingsQuery(undefined, {
    pollingInterval: 60000,
  });

  const currentStatus = React.useMemo(() => {
    const currentDate = new Date();

    if (bookingsResponse?.success) {
      return bookingsResponse?.data?.find(
        (booking) =>
          compareAsc(currentDate, new Date(booking.start)) === 1 &&
          compareDesc(currentDate, new Date(booking.end)) === 1
      );
    }
  }, [bookingsResponse?.data, bookingsResponse?.success]);

  const occupiedBy = useOccupiedBy(currentStatus?.userId ?? "");

  const currentAvailableDurations: number[] = React.useMemo(() => {
    const durations: number[] = [];
    if (
      resourceResponse?.success &&
      bookingsResponse?.success &&
      resourceResponse.data
    ) {
      const {
        minimumBookingDuration,
        maximumBookingDuration,
        bookingDurationStep,
      } = resourceResponse.data;
      const currentDate = new Date();
      const bookingStartDates = bookingsResponse.data
        ?.map((booking) => new Date(booking.start))
        .sort();
      const nextBookingDate = bookingStartDates?.find(
        (bookingDate) => compareAsc(bookingDate, currentDate) === 1
      );
      if (nextBookingDate) {
        const timeBeforeNextMeeting = differenceInMinutes(
          nextBookingDate,
          currentDate
        );
        for (
          let i = minimumBookingDuration;
          i <= timeBeforeNextMeeting && i <= maximumBookingDuration;
          i += bookingDurationStep
        ) {
          durations.push(i);
        }
      } else {
        for (
          let i = minimumBookingDuration;
          i <= maximumBookingDuration;
          i += bookingDurationStep
        ) {
          durations.push(i);
        }
      }
    }
    return durations;
  }, [
    bookingsResponse?.data,
    bookingsResponse?.success,
    resourceResponse?.data,
    resourceResponse?.success,
  ]);

  return {
    isLoading,
    occupiedBy,
    currentMeetName: currentStatus?.name,
    isAvailable: !currentStatus,
    currentAvailableDurations,
  };
};
