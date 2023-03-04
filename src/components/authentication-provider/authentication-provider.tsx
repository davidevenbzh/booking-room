import { CircularProgress } from "@mui/material";
import React from "react";
import { useAuthentication } from "../../hooks";

interface AuthenticationProviderProps {
  children: JSX.Element;
}

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const { isLoading } = useAuthentication();
  return isLoading ? <CircularProgress /> : children;
};

export default AuthenticationProvider;
