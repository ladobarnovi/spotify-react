import styles from "./AppFooter.module.scss";
import FooterLoggedOut from "./FooterLoggedOut/FooterLoggedOut";
import { useAuth } from "hooks/useAuth";

function AppFooter() {
  const { isAuthorized } = useAuth();

  const elFooterLoggedOut = isAuthorized ?? <FooterLoggedOut />

  return (
    <div className={styles.appFooter}>
      { elFooterLoggedOut }
    </div>
  );
}

export default AppFooter;
