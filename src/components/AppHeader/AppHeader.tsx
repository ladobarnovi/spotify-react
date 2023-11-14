import styles from "./AppHeader.module.scss";
import { useAuth } from "hooks/useAuth";
import HeaderLoggedIn from "components/AppHeader/HeaderLoggedIn/HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut/HeaderLoggedOut";

function AppHeader() {
  const { isAuthorized } = useAuth();

  const elHeaderComponent = isAuthorized ? <HeaderLoggedIn /> : <HeaderLoggedOut /> ;

  return (
    <div className={styles.appHeader}>
      { elHeaderComponent }
    </div>
  )
}

export default AppHeader;
