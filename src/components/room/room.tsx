import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetResourceQuery } from "../../store";
import CreateBooking from "../create-booking";
import Infos from "../infos";
import Status from "../status";
import Timeline from "../timeline";

/**
 * A component who will all infos and component related to room
 */
const Room = () => {
  const { data, isLoading } = useGetResourceQuery();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Box role="header" sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h1" sx={{ mr: 2 }}>
          {data?.data?.name}
        </Typography>
        <Status />
      </Box>
      <Box role="main">
        <CreateBooking />
        <Infos />
        <Timeline />
      </Box>
    </>
  );
};

export default Room;
