import React from "react";
import { useGetBookingsQuery } from "../store/api/bookings";

export const useStatus = () => {
  const { data, isLoading } = useGetBookingsQuery(undefined, {
    pollingInterval: 60000,
  });

  const currentStatus = React.useMemo(() => {
    const currentDate = new Date();

    if (data?.success) {
      return data?.data?.find(
        (booking) =>
          new Date(booking.start).getTime() < currentDate.getTime() &&
          new Date(booking.end).getTime() > currentDate.getTime()
      );
    }
  }, [data?.data, data?.success]);
  return {
    isLoading,
    occupiedBy: currentStatus?.userId,
    currentMeetName: currentStatus?.name,
    isAvailable: !currentStatus,
  };
};
