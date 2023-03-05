import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ErrorNotification } from "../types";

const initialState: ErrorNotification = {
  message: "",
  display: false,
};

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
