import React from "react";
import {
  useGetUserByIdQuery,
  useGetBookingsQuery,
  useGetResourceQuery,
} from "../store";

const useOccupiedBy = (userId: string) => {
  const { data } = useGetUserByIdQuery(userId, { skip: userId.length === 0 });

  const occupiedBy = React.useMemo(() => {
    if (data?.success) {
      return data?.data?.name;
    }
  }, [data]);

  return occupiedBy;
};

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
          new Date(booking.start).getTime() < currentDate.getTime() &&
          new Date(booking.end).getTime() > currentDate.getTime()
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
      const currentTime = new Date().getTime();
      const bookingStartTimes = bookingsResponse.data
        ?.map((booking) => new Date(booking.start).getTime())
        .sort();
      console.log(bookingStartTimes);
      const nextBookingTime = bookingStartTimes?.find(
        (bookingTime) => currentTime < bookingTime
      );
      console.log(nextBookingTime);
      if (nextBookingTime) {
        const timeBeforeNextMeeting = (nextBookingTime - currentTime) / 60000;
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
