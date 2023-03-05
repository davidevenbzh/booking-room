import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useAuthentication } from "../../hooks";

interface AuthenticationProviderProps {
  children: JSX.Element;
}

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const { isLoading, error } = useAuthentication();
  return isLoading && !error ? (
    <CircularProgress />
  ) : error ? (
    <Typography>Non connecté</Typography>
  ) : (
    children
  );
};

export default AuthenticationProvider;
