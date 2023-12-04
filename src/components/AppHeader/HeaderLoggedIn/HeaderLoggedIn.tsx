import styles from "./HeaderLoggedIn.module.scss"
import { useAuth } from "hooks/useAuth";
import HeaderNavigation from "components/AppHeader/HeaderNavigation/HeaderNavigation";

function HeaderLoggedIn () {
  const { user } = useAuth();

  const profileImage = user?.images[0].url;
  const userName = user?.display_name;

  return (
    <div className={styles.headerLoggedIn}>
      <HeaderNavigation />
      <div id="tpSearchInput" className={styles.searchInputContainer} />
      <div className={styles.profile}>
        <img src={profileImage} alt={userName} />
      </div>
    </div>
  )
}

export default HeaderLoggedIn;
