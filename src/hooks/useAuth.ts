import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { accessToken, isAuthenticated, refreshToken } = state;

  return { accessToken, isAuthenticated, refreshToken, dispatch };
};

export default useAuth;
