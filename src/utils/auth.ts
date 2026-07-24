import { generateCodeVerifier, generateCodeChallenge, generateState } from "utils/pkce";
import { setPendingAuth, getPendingAuth, clearPendingAuth } from "utils/oauthSession";
import { setTokens, getRefreshToken, clearTokens } from "utils/tokenStorage";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export async function buildAuthorizeUrl(): Promise<string> {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = generateState();

  setPendingAuth({ verifier, state });

  const clientId = process.env.REACT_APP_CLIENT_ID as string;
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL as string;
  const scopes = process.env.REACT_APP_SCOPES as string;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scopes,
    code_challenge_method: "S256",
    code_challenge: challenge,
    redirect_uri: redirectUrl,
    state,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function redirectToAuth(): Promise<void> {
  window.location.href = await buildAuthorizeUrl();
}

export async function exchangeCodeForToken(code: string, state: string): Promise<void> {
  try {
    const pending = getPendingAuth();
    if (!pending.state || !pending.verifier || pending.state !== state) {
      console.error("PKCE state mismatch during token exchange");
      throw new Error("PKCE state mismatch");
    }

    const clientId = process.env.REACT_APP_CLIENT_ID as string;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL as string;
    const params = new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUrl,
      code_verifier: pending.verifier,
    });

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Token exchange failed:", data);
      throw new Error(data.error_description || "Token exchange failed");
    }

    setTokens(data);
  } finally {
    clearPendingAuth();
  }
}

let inFlightRefresh: Promise<string | null> | null = null;

export function refreshAccessToken(): Promise<string | null> {
  if (inFlightRefresh) return inFlightRefresh;

  inFlightRefresh = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      console.error("No refresh token available");
      return null;
    }

    const clientId = process.env.REACT_APP_CLIENT_ID as string;
    const params = new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    try {
      const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Token refresh failed:", data);
        clearTokens();
        return null;
      }

      setTokens(data);
      return data.access_token as string;
    } catch (err) {
      console.error("Token refresh failed:", err);
      clearTokens();
      return null;
    }
  })().finally(() => {
    inFlightRefresh = null;
  });

  return inFlightRefresh;
}
