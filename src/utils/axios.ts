import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { refreshAccessToken } from "utils/auth";
import { clearTokens } from "utils/tokenStorage";

interface IRetriableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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
    async (error: AxiosError) => {
      const config = error.config as IRetriableConfig | undefined;

      if (error.response?.status === 401 && config && !config._retry) {
        config._retry = true;

        const newToken = await refreshAccessToken();
        if (newToken) {
          setAxiosToken(newToken);
          config.headers["Authorization"] = "Bearer " + newToken;
          return axios(config);
        }

        clearTokens();
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  )
}
