import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Token } from "../types";

const initialState: Partial<Token> = {};

/**
 * Initilisation of slice with redux-toolkit
 * @description This slice will be used to store identification token and expiration date
 */
export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (_state, action: PayloadAction<Token>) => ({
      ...action.payload,
    }),
    resetToken: () => ({
      ...initialState,
    }),
  },
});

export const { setToken, resetToken } = tokenSlice.actions;
export default tokenSlice.reducer;
