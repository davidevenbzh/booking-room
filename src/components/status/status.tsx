import { CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useStatus } from "../../hooks";
import React from "react";

const Status = () => {
  const { isLoading, isAvailable } = useStatus();

  const availabilityIcon = React.useMemo(
    () =>
      isAvailable ? (
        <CheckCircleIcon color="success" fontSize="large" />
      ) : (
        <RemoveCircleIcon color="error" fontSize="large" />
      ),
    [isAvailable]
  );

  return isLoading ? <CircularProgress /> : availabilityIcon;
};

export default Status;
