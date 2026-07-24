const VERIFIER_KEY = "pkce_code_verifier";
const STATE_KEY = "pkce_state";

interface IPendingAuth {
  verifier: string | null;
  state: string | null;
}

export function setPendingAuth({ verifier, state }: { verifier: string; state: string }): void {
  sessionStorage.setItem(VERIFIER_KEY, verifier);
  sessionStorage.setItem(STATE_KEY, state);
}

export function getPendingAuth(): IPendingAuth {
  return {
    verifier: sessionStorage.getItem(VERIFIER_KEY),
    state: sessionStorage.getItem(STATE_KEY),
  };
}

export function clearPendingAuth(): void {
  sessionStorage.removeItem(VERIFIER_KEY);
  sessionStorage.removeItem(STATE_KEY);
}
