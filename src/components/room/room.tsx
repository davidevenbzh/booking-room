import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetResourceQuery } from "../../store";
import CreateBooking from "../create-booking";
import Infos from "../infos";
import Status from "../status";
import Timeline from "../timeline";

const Room = () => {
  const { data, isLoading } = useGetResourceQuery();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h1" sx={{ mr: 2 }}>
          {data?.data?.name}
        </Typography>
        <Status />
      </Box>
      <CreateBooking />
      <Infos />
      <Timeline />
    </>
  );
};

export default Room;
