import styles from "./MainLayout.module.scss";
import { ReactNode, useEffect } from "react";
import { setScrollDistance } from "store/global/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useScroll } from "hooks/useScroll";
import { RootState } from "store";
import { useLocation } from "react-router-dom";
import AppPlayer from "components/AppPlayer/AppPlayer";
import AppSidebarCompact from "components/AppSidebar/AppSidebarCompact/AppSidebarCompact";
import AppSidebar from "components/AppSidebar/AppSidebar";
import AppHeader from "components/AppHeader/AppHeader";
import AppFooter from "components/AppFooter/AppFooter";
import AppNowPlayingSidebar from "components/AppNowPlayingSidebar/AppNowPlayingSidebar";

type Props = {
  children: ReactNode
}

function MainLayout({ children }: Props) {
  console.log("Main layout")
  const dispatch = useDispatch();
  const { pathname } = useLocation()
  const { overlayScrollbar, refScrollbar } = useScroll();

  const isNowPlayingActive = useSelector((state: RootState) => state.globalReducer.isNowPlayingActive);
  const isSidebarCompact = useSelector((state: RootState) => state.globalReducer.isSidebarCompact);

  useEffect(() => {
    if (refScrollbar.current != null && overlayScrollbar != null) {
      overlayScrollbar.on("scroll", (e) => {
        dispatch(setScrollDistance(e.elements().content.scrollTop));
      })
    }
  }, [ overlayScrollbar ])

  useEffect(() => {
    if (overlayScrollbar == null) return;

    const { scrollOffsetElement } = overlayScrollbar.elements();
    scrollOffsetElement.scrollTo({
      behavior: "auto",
      top: 0,
    });
  }, [ pathname ])

  const elSidebar = isSidebarCompact ? <AppSidebarCompact /> : <AppSidebar />;
  const elNowPlaying = isNowPlayingActive ? <AppNowPlayingSidebar /> : null;

  const classExtendedGrid = isNowPlayingActive ? styles.extendedGrid : "";

  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.mainLayout} ${classExtendedGrid}`}>
        { elSidebar }
        <div className={styles.scrollContainer}>
          <AppHeader />

          <div className={styles.content}>
            <div className={styles.scroll} ref={refScrollbar}>
              <div className={styles.wrapper}>
                { children }

                <AppFooter />
              </div>
            </div>
          </div>
        </div>
        { elNowPlaying }
        <AppPlayer />
      </div>
    </div>
  );
}

export default MainLayout;
