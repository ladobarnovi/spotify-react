import { setAxiosToken } from "utils/axios";
import store from "store";
import { setIsAuthorized } from "store/auth/authSlice";

export const AUTH_TOKEN_KEY = "token";

export function tryGetAuthToken() {
  const hash = window.location.hash;
  let token;
  if (hash.includes("access_token")) {
    const start = window.location.hash.indexOf("=") + 1;
    const end = window.location.hash.indexOf("&");
    token = hash.substring(start, end);

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    store.dispatch(setIsAuthorized(true));
  } else {
    token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token == null || token === "") {
      window.history.pushState("", "", "/login");
      return;
    }
  }

  setAxiosToken(token ?? "");
  return token;
}
