import { CircularProgress, Typography } from "@mui/material";
import { useGetResourceQuery } from "../../store";
import Status from "../status";

const Room = () => {
  const { data, isLoading } = useGetResourceQuery();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Typography variant="h1">{data?.data?.name}</Typography>
      <Status />
    </>
  );
};

export default Room;
