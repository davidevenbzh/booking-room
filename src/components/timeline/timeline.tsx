import { CircularProgress } from "@mui/material";
import MUITimeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import React from "react";
import { useGetBookingsQuery } from "../../store";

const Timeline = () => {
  const { isLoading, data } = useGetBookingsQuery();

  const bookings = React.useMemo(
    () =>
      data?.data?.map((booking, index) => {
        const begin = new Date(booking.start);
        const end = new Date(booking.end);
        return (
          <TimelineItem key={booking.id}>
            <TimelineOppositeContent>{`${begin.getDate()}/${
              begin.getMonth() + 1
            }/${begin.getFullYear()} ${begin.getHours()}H${begin.getMinutes()} - ${end.getHours()}H${end.getMinutes()}`}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {data?.data?.length !== index + 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{booking.name}</TimelineContent>
          </TimelineItem>
        );
      }),
    [data?.data]
  );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <MUITimeline>{bookings}</MUITimeline>
  );
};

export default Timeline;
