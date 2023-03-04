import { CircularProgress, Typography } from "@mui/material";
import { useGetResourceQuery } from "../../store/api/resource.request";

const Room = () => {
  const { data, isLoading } = useGetResourceQuery();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Typography variant="h1">{data?.data?.name}</Typography>
  );
};

export default Room;
