import {
  isRejectedWithValue,
  type Middleware,
  type MiddlewareAPI,
} from "@reduxjs/toolkit";
import { displayError } from "../error-notification.slice";

export const errorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      api.dispatch(
        displayError({ message: action.payload.error, display: true })
      );
    }
    return next(action);
  };
