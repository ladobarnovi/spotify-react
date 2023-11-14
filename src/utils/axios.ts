import axios from "axios";

export function setAxiosBaseUrl() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL as string;
}

export function setAxiosToken(token: string) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}
