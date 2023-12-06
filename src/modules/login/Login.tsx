import styles from "./Login.module.scss"
import AuthButton from "components/AuthButton/AuthButton";
import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";
import { useLayout } from "hooks/useLayout";
import { ELayout } from "store/global/globalSlice";

function Login() {
  const { redirectToAuth } = useAuth();
  const { setLayout } = useLayout();

  useEffect(() => {
    setLayout(ELayout.Login);

    return () => setLayout(ELayout.Main);
  }, [ ]);

  return (
    <div className={styles.login}>
      <img src="/svg/spotify.svg" alt="Spotify" />
      <AuthButton onClick={redirectToAuth}>
        Log In
      </AuthButton>
    </div>
  )
}

export default Login;
