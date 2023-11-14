import { setAxiosToken } from "utils/axios";

export function getTokenFromUrl() {
  const hash = window.location.hash;
  let token;
  if (hash.includes("access_token")) {
    const start = window.location.hash.indexOf("=") + 1;
    const end = window.location.hash.indexOf("&");
    token = hash.substring(start, end);

    localStorage.token = token;
  } else {
    token = localStorage.token;
  }

  if (token != null) {
    setAxiosToken(token);
  }

  return token;
}
