import { setAxiosToken } from "utils/axios";

export const AUTH_TOKEN_KEY = "token";

export async function tryGetAuthToken() {
  // const hash = window.location.hash;
  // let token;
  // if (hash.includes("code")) {
  //   const start = window.location.hash.indexOf("=") + 1;
  //   const end = window.location.hash.indexOf("&");
  //   token = hash.substring(start, end);

  //   localStorage.setItem(AUTH_TOKEN_KEY, token);
  //   window.history.replaceState(
  //     {},
  //     document.title,
  //     window.location.pathname + window.location.search
  //   );
  // } else {
  //   token = localStorage.getItem(AUTH_TOKEN_KEY);

  //   if (token == null || token === "") {
  //     window.history.pushState("", "", "/login");
  //     return;
  //   }
  // }

  // setAxiosToken(token ?? "");
  // return token;

  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    return setAxiosToken(localStorage.getItem(AUTH_TOKEN_KEY) ?? "")
  }

  const code = new URLSearchParams(window.location.search).get("code") as string;
  const codeVerifier = localStorage.getItem("code_verifier") as string;

  if (!code) return;

  const clientId = process.env.REACT_APP_CLIENT_ID as string;
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL as string;
  const scopes = process.env.REACT_APP_SCOPES as string;
  const params = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUrl,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = await response.json();

  console.log(response)
  if (!response.ok) {
    console.error("Token exchange failed:", data);
    throw new Error(data.error_description || "Token exchange failed");
  }

  // data.access_token, data.refresh_token, data.expires_in
  localStorage.setItem(AUTH_TOKEN_KEY, data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  setAxiosToken(data.access_token ?? "");

  console.log(data)

  return data;
}
