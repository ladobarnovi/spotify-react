// RFC 7636 unreserved chars, trimmed to 64 so a random byte (0-255) maps uniformly (256 % 64 === 0).
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function randomString(length: number): string {
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values, (v) => ALPHABET[v % ALPHABET.length]).join("");
}

export function generateCodeVerifier(): string {
  return randomString(128);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function generateState(): string {
  return randomString(32);
}
