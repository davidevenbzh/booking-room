import { useAuthentication } from "../../hooks";

const Room = () => {
  const isAuthenticated = useAuthentication();
  return isAuthenticated ? <>authenticated</> : <>not authenticated</>;
};

export default Room;
