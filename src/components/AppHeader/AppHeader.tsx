import styles from "./AppHeader.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "store";
import React, { useEffect, useRef } from "react";
import HeaderNavigation from "components/AppHeader/HeaderNavigation/HeaderNavigation";
import HeaderProfile from "components/AppHeader/HeaderProfile/HeaderProfile";

function AppHeader() {
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

  return (
    <div className={styles.appHeader}>
      <div ref={backgroundRef} className={`${styles.background} ${styles.colored}`} />
      <div className={styles.headerWrapper}>
        <HeaderNavigation />
        <div id="tpSearchInput" className={styles.searchInputContainer} />
        <HeaderProfile />
      </div>
    </div>
  )
}

export default AppHeader;
