import { CircularProgress, Typography } from "@mui/material";
import { useGetResourceQuery } from "../../store";
import CreateBooking from "../create-booking";
import Status from "../status";
import Timeline from "../timeline";

const Room = () => {
  const { data, isLoading } = useGetResourceQuery();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Typography variant="h1">{data?.data?.name}</Typography>
      <Status />
      <Timeline />
      <CreateBooking />
    </>
  );
};

export default Room;
