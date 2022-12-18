import { setNotification } from "../redux/reducer/notificationReducer";
import jwtDecode from "jwt-decode";
import { publicRequest } from "./../utils/axiosInstance";
type FormLogin = {
  userOrEmail: string;
  password: string;
};

type FormRegister = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormLogout = {
  refreshToken: string;
};

type CallbackAuth = {
  error: string | null | boolean;
  loading: boolean;
  message: string | null;
};

interface AuthAction {
  dispatch: any;
  dispatchRedux: any;
}

interface LoginAction extends AuthAction {
  data: FormLogin;
  callback: (data: CallbackAuth) => void;
}

interface RegisterAction extends AuthAction {
  data: FormRegister;
  callback: (data: CallbackAuth) => void;
}

interface LogoutAction extends AuthAction {
  data: FormLogout;
}

type Decoded = {
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  refresh_token: string;
};

export const login = async ({
  dispatch,
  dispatchRedux,
  data,
  callback,
}: LoginAction) => {
  callback({
    error: null,
    loading: true,
    message: null,
  });
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await publicRequest.post("/auth/login", data);
    const { msg, accessToken } = response.data;
    const { refresh_token } = jwtDecode<Decoded>(accessToken!);
    callback({
      error: false,
      loading: false,
      message: msg,
    });
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        accessToken,
        refreshToken: refresh_token,
      },
    });
    if (msg) {
      dispatchRedux(
        setNotification({
          isNotification: true,
          isSuccess: true,
          message: msg,
        })
      );
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refresh_token);
  } catch (error: any) {
    callback({
      error: true,
      loading: false,
      message: error.response?.data?.msg,
    });
    dispatch({ type: "LOGIN_FAILURE" });
    if (error.response?.data?.msg) {
      dispatchRedux(
        setNotification({
          isNotification: true,
          isSuccess: false,
          message: error.response?.data?.msg,
        })
      );
    }
  }
};

export const logout = async ({
  dispatch,
  dispatchRedux,
  data,
}: LogoutAction) => {
  try {
    const response = await publicRequest.delete("/auth/logout", {
      data: {
        refresh_token: data.refreshToken,
      },
    });
    const { msg }: { msg: string } = response.data;
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    if (msg) {
      dispatchRedux(
        setNotification({
          isNotification: true,
          isSuccess: true,
          message: msg,
        })
      );
    }
  } catch (error: any) {
    const { msg }: { msg: string } = error.response?.data;
    if (msg) {
      dispatchRedux(
        setNotification({
          isNotification: true,
          isSuccess: false,
          message: msg,
        })
      );
    }
  }
};

export const register = async ({
  dispatch,
  dispatchRedux,
  data,
  callback,
}: RegisterAction) => {
  callback({
    error: null,
    loading: true,
    message: null,
  });
  try {
    const response = await publicRequest.post("/auth/register", data);
    const { msg } = response.data;
    callback({
      error: false,
      loading: false,
      message: msg,
    });
    if (msg) {
      dispatchRedux(
        setNotification({
          isNotification: true,
          isSuccess: true,
          message: msg,
        })
      );
    }
  } catch (error: any) {
    const { msg }: { msg: string } = error.response?.data;
    if (msg) {
      dispatchRedux(
        setNotification({
          isNotification: true,
          isSuccess: false,
          message: msg,
        })
      );
    }
  }
};
