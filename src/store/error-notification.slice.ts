import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ErrorNotification } from "../types";

const initialState: ErrorNotification = {
  message: "",
  display: false,
};

/**
 * Initilisation of slice with redux-toolkit
 * @description This slice will be used to trigger display of a snackbar with error message when it's needed
 */
export const errorNotificationSlice = createSlice({
  name: "errorNotification",
  initialState,
  reducers: {
    displayError: (_state, action: PayloadAction<ErrorNotification>) => ({
      ...action.payload,
    }),
    clearError: () => ({
      ...initialState,
    }),
  },
});

export const { displayError, clearError } = errorNotificationSlice.actions;
export default errorNotificationSlice.reducer;
