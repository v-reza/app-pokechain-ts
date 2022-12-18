import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { publicRequest } from "../utils/axiosInstance";
import { setUser } from "../redux/reducer/userReducer";

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
};

type AuthContextValue = {
  state: AuthContextType;
  dispatch: React.Dispatch<any>;
};

type Decoded = {
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  refresh_token: string;
};

type AuthContextProps = {
  children: React.ReactNode;
};

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: localStorage.getItem("accessToken") ? true : false,
};

export const AuthContext = createContext<AuthContextValue>({
  state: initialState,
  dispatch: (action) => action,
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    const decodedUser = async (): Promise<void> => {
      if (state.accessToken) {
        const { exp } = jwtDecode<Decoded>(state.accessToken);

        if (exp * 1000 < new Date().getTime()) {
          try {
            const response = await publicRequest.get("/auth/token", {
              params: {
                refreshToken: state.refreshToken,
              },
            });
            const { accessToken } = response.data;
            localStorage.setItem("accessToken", accessToken);
            const decodedUser = jwtDecode(accessToken);
            dispatchRedux(setUser({ user: decodedUser }));
          } catch (error: any) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch({ type: "LOGOUT" });
          }
        } else {
          const decodedUser = jwtDecode(state.accessToken);
          dispatchRedux(setUser({ user: decodedUser }));
        }
      }
    };
    decodedUser();
  }, [dispatchRedux, state.accessToken, state.refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
