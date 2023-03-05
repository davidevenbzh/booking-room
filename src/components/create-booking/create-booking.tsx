import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { usePostBookingMutation } from "../../store";
import { useStatus } from "../../hooks";

const CreateBooking = () => {
  const { isAvailable, currentAvailableDurations } = useStatus();
  const [open, setOpen] = React.useState<boolean>(false);
  const [duration, setDuration] = React.useState<number>(10);
  const [name, setName] = React.useState<string>("");
  const [postBooking] = usePostBookingMutation();

  const options = React.useMemo(
    () =>
      currentAvailableDurations.map((duration) => (
        <MenuItem
          key={`duration-option-${duration}`}
          value={duration}
        >{`${duration} minutes`}</MenuItem>
      )),
    [currentAvailableDurations]
  );

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      postBooking({ name, duration }).finally(() => {
        setOpen(false);
      });
    },
    [duration, name, postBooking]
  );
  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        disabled={!isAvailable || currentAvailableDurations.length === 0}
      >
        <AddIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Créer une réunion</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <FormControl fullWidth sx={{ gap: 2, mt: 2 }}>
              <TextField
                id="name"
                required
                label="Nom de la réunion"
                value={name}
                placeholder="watching party: Suicide Squad"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Select
                id="duration"
                label="Durée"
                required
                value={duration}
                onChange={(event) => {
                  setDuration(event.target.value as number);
                }}
              >
                {options}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Créer
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateBooking;
