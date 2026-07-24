import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exchangeCodeForToken } from "utils/auth";
import { useAuth } from "context/AuthContext";

function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { onAuthenticated } = useAuth();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      console.error("Missing code or state on auth callback");
      navigate("/login", { replace: true });
      return;
    }

    exchangeCodeForToken(code, state)
      .then(() => {
        onAuthenticated();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("Auth callback failed:", err);
        navigate("/login", { replace: true });
      });
  }, [searchParams, navigate, onAuthenticated]);

  return null;
}

export default Callback;
