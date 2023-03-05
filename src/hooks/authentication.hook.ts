import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, setToken, useLoginQuery } from "../store";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.token);
  const { data, isLoading, error } = useLoginQuery();

  React.useEffect(() => {
    if (data?.success && data?.data) {
      dispatch(setToken(data.data));
    }
  }, [data, dispatch]);

  return {
    isLoading: isLoading || !token,
    expirationDate: data?.data?.expirationDate,
    error,
  };
};
