import { Box, CircularProgress, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useStatus } from "../../hooks";
import React from "react";

const Status = () => {
  const { isLoading, isAvailable, currentMeetName, occupiedBy } = useStatus();

  const availabilityIcon = React.useMemo(
    () =>
      isAvailable ? (
        <CheckCircleIcon color="success" />
      ) : (
        <RemoveCircleIcon color="error" />
      ),
    [isAvailable]
  );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Box>
      {availabilityIcon}
      {!isAvailable && (
        <>
          <Typography variant="body1">{currentMeetName}</Typography>
          <Typography variant="subtitle1">{occupiedBy}</Typography>
        </>
      )}
    </Box>
  );
};

export default Status;
