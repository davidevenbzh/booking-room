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
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useGetMeQuery,
} from "../../store";

import { format } from "date-fns";

/**
 * A component who will display room timeline for the current day
 */
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
                <IconButton
                  aria-label={`Supprimer la réunion ${booking.name}`}
                  onClick={() => deleteBooking({ id: booking.id })}
                >
                  <DeleteIcon aria-hidden />
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
