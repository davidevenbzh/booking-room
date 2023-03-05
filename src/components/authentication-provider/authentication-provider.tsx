import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { differenceInMilliseconds } from "date-fns";
import { useAuthentication } from "../../hooks";

interface AuthenticationProviderProps {
  /**
   * children element
   */
  children: JSX.Element;
}

/**
 * A component who will handle authentication logic, all children are display if authentication succeed
 * @param {JSX.element} children child HTML node
 */
const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const { isLoading, error, expirationDate } = useAuthentication();
  const [open, setOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (expirationDate) {
      const currentDate = new Date();
      setTimeout(() => {
        setOpen(true);
      }, differenceInMilliseconds(new Date(expirationDate), currentDate) - 60000);
    }
  }, [expirationDate]);

  return isLoading && !error ? (
    <CircularProgress />
  ) : error ? (
    <Typography>Non connecté</Typography>
  ) : (
    <>
      <Dialog open={open}>
        <DialogTitle>Session Expiré</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Votre session a expiré. Veuillez rafraîchir la page pour continuer
          </DialogContentText>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Rafraîchir
          </Button>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
};

export default AuthenticationProvider;
