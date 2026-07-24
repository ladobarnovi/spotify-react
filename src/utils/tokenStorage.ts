export const AUTH_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";
const EXPIRES_AT_KEY = "token_expires_at";

interface ITokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export function getAccessToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getExpiresAt(): number | null {
  const value = localStorage.getItem(EXPIRES_AT_KEY);
  return value ? Number(value) : null;
}

export function hasAccessToken(): boolean {
  return !!getAccessToken();
}

export function isAccessTokenExpired(bufferSeconds = 60): boolean {
  const expiresAt = getExpiresAt();
  if (!expiresAt) return true;
  return Date.now() >= expiresAt - bufferSeconds * 1000;
}

export function setTokens({ access_token, refresh_token, expires_in }: ITokenResponse): void {
  localStorage.setItem(AUTH_TOKEN_KEY, access_token);
  if (refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  }
  localStorage.setItem(EXPIRES_AT_KEY, String(Date.now() + expires_in * 1000));
}

export function clearTokens(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
}
