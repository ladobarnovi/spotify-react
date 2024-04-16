import styles from "./FooterLoggedOut.module.scss";
import AuthButton from "components/AuthButton/AuthButton";
import { useAuth } from "context/AuthContext";


function FooterLoggedOut() {
  const { redirectToAuth } = useAuth();

  return (
    <div className={styles.footerLoggedOut}>
      <AuthButton onClick={ redirectToAuth }>
        Sign Up Free
      </AuthButton>
    </div>
  );
}

export default FooterLoggedOut;
