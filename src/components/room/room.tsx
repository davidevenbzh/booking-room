import { CircularProgress, Typography } from "@mui/material";
import { useGetResourceQuery } from "../../store";
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
    </>
  );
};

export default Room;
