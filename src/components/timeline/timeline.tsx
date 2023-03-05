import { CircularProgress, IconButton } from "@mui/material";
import MUITimeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useDeleteBookingMutation, useGetBookingsQuery } from "../../store";
import { useGetMeQuery } from "../../store/api/me.request";
import { format } from "date-fns";

const Timeline = () => {
  const { data: meResponse } = useGetMeQuery();
  const { isLoading, data: bookingsResponse } = useGetBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();

  const bookings = React.useMemo(
    () =>
      bookingsResponse?.data?.map((booking, index) => {
        const begin = new Date(booking.start);
        const end = new Date(booking.end);
        return (
          <TimelineItem key={booking.id}>
            <TimelineOppositeContent>
              {`${format(begin, "dd/MM/yyyy HH:mm")} - ${format(end, "HH:mm")}`}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {bookingsResponse?.data?.length !== index + 1 && (
                <TimelineConnector />
              )}
            </TimelineSeparator>
            <TimelineContent
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {booking.name}
              {meResponse?.data?.id === booking.userId && (
                <IconButton onClick={() => deleteBooking({ id: booking.id })}>
                  <DeleteIcon />
                </IconButton>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      }),
    [bookingsResponse?.data, deleteBooking, meResponse?.data?.id]
  );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <MUITimeline>{bookings}</MUITimeline>
  );
};

export default Timeline;
