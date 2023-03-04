import React from "react";
import { useGetUserByIdQuery } from "../store";
import { useGetBookingsQuery } from "../store/api/bookings.request";

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
  const occupiedBy = useOccupiedBy(currentStatus?.id ?? "");

  return {
    isLoading,
    occupiedBy,
    currentMeetName: currentStatus?.name,
    isAvailable: !currentStatus,
  };
};
