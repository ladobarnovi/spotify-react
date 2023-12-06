import axios, { AxiosError, AxiosResponse } from "axios";
import { AUTH_TOKEN_KEY } from "utils/auth";

export function setAxiosBaseUrl(): void {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL as string;

  setAxiosInterceptors()
}

export function setAxiosToken(token: string): void {
  axios.defaults.headers["Authorization"] = token === "" || token == null ? null :  "Bearer " + token;
}

export function setAxiosInterceptors(): void {
  axios.interceptors.response.use(
    (response): AxiosResponse => response,
    (res: AxiosError) => {
      if (res.response?.status === 401) {
        localStorage.setItem(AUTH_TOKEN_KEY, "");
        window.location.href = "/login";
      }

      return Promise.reject(res);
    }
  )
}
