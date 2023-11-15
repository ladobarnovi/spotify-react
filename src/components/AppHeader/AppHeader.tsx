import styles from "./AppHeader.module.scss";
import { useAuth } from "hooks/useAuth";
import HeaderLoggedIn from "components/AppHeader/HeaderLoggedIn/HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut/HeaderLoggedOut";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect, useRef } from "react";

function AppHeader() {
  const { isAuthorized } = useAuth();
  const backgroundRef = useRef<HTMLDivElement>(null)
  const headerColor = useSelector((state: RootState) => state.globalReducer.headerColor);
  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);

  useEffect(() => {
    if (backgroundRef.current == null) return;

    backgroundRef.current.style.opacity = Math.min(1, scrollDistance / 340).toString()

    if (headerColor == null) return;
    const { r, g, b } = headerColor;
    backgroundRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }, [ scrollDistance, headerColor ])

  const elHeaderComponent = isAuthorized ? <HeaderLoggedIn /> : <HeaderLoggedOut /> ;

  return (
    <div className={styles.appHeader}>
      <div ref={backgroundRef} className={`${styles.background} ${styles.colored}`} />
      { elHeaderComponent }
    </div>
  )
}

export default AppHeader;
