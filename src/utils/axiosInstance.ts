import useAuth from "../hooks/useAuth";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";

type BaseURL = {
  development: string;
  production?: string;
};

type Decoded = {
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  refresh_token: string;
};

const baseUrl: BaseURL = {
  development: "http://localhost:5000/api/v1",
};

export const useAxios = () => {
  const { accessToken, dispatch } = useAuth();
  
  const axiosInstance = axios.create({
    baseURL: baseUrl.development,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig): Promise<AxiosRequestConfig<any>> => {
      const { exp, refresh_token } = jwtDecode<Decoded>(accessToken!);
      if (exp * 1000 < new Date().getTime()) {
        try {
          const response = await publicRequest.get("/auth/token", {
            params: {
              refreshToken: refresh_token,
            },
          });
          const { accessToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          config.headers!.Authorization = `Bearer ${accessToken}`;
        } catch (error: unknown | AxiosError<any>) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({ type: "LOGOUT" });
        }
      }
      return config;
    }
  );

  return axiosInstance;
};

export const publicRequest = axios.create({
  baseURL: baseUrl.development,
});
