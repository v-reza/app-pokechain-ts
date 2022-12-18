type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
};

type AuthAction = {
  type: string;
  payload?: AuthContextType;
};

export const AuthReducer = (
  state: AuthContextType,
  action: AuthAction
): AuthContextType => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.payload!.accessToken,
        refreshToken: action.payload!.refreshToken,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
