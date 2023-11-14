import styles from "./HeaderLoggedOut.module.scss"
import React from "react";

import { useAuth } from "hooks/useAuth";
import AuthButton from "components/AuthButton/AuthButton";

function HeaderLoggedOut() {
  const { redirectToAuth } = useAuth();

  return (
    <div className={styles.headerLoggedOut}>
      <div></div>

      <AuthButton onClick={ redirectToAuth }>
        Log In
      </AuthButton>
    </div>
  );
}

export default HeaderLoggedOut;
