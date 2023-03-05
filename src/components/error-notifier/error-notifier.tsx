import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearError, type RootState } from "../../store";

/**
 * A component for display error in application
 */
const ErrorNotifier = () => {
  const notification = useSelector(
    (state: RootState) => state.errorNotification
  );
  const dispatch = useDispatch();
  return (
    <Snackbar
      color="error"
      open={notification.display}
      onClose={() => dispatch(clearError())}
      autoHideDuration={5000}
      message={notification.message}
    />
  );
};

export default ErrorNotifier;
