import { CircularProgress, Paper, Typography } from "@mui/material";
import { useStatus } from "../../hooks";

const Infos = () => {
  const { isLoading, isAvailable, currentMeetName, occupiedBy } = useStatus();

  return isLoading ? (
    <CircularProgress />
  ) : !isAvailable && currentMeetName && occupiedBy ? (
    <Paper sx={{ p: 4 }}>
      <Typography
        variant="body1"
        sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
      >{`Nom de la réunion en cours: ${currentMeetName}`}</Typography>
      <Typography variant="subtitle1">{`Organisateur: ${occupiedBy}`}</Typography>
    </Paper>
  ) : null;
};

export default Infos;