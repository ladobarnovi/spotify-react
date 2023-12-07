import styles from "./MainLayout.module.scss";
import { ReactNode, useEffect } from "react";
import { api } from "api";
import { setUser } from "store/auth/authSlice";
import { setScrollDistance } from "store/global/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useScroll } from "hooks/useScroll";
import { RootState } from "store";
import { useAuth } from "hooks/useAuth";
import { useLocation } from "react-router-dom";
import AppPlayer from "components/AppPlayer/AppPlayer";
import AppSidebarCompact from "components/AppSidebar/AppSidebarCompact/AppSidebarCompact";
import AppSidebar from "components/AppSidebar/AppSidebar";
import AppHeader from "components/AppHeader/AppHeader";
import AppFooter from "components/AppFooter/AppFooter";

type Props = {
  children: ReactNode
}

function MainLayout({ children }: Props) {
  const dispatch = useDispatch();
  const { pathname } = useLocation()
  const { isAuthorized } = useAuth();
  const { overlayScrollbar, refScrollbar } = useScroll();

  const isSidebarCompact = useSelector((state: RootState) => state.globalReducer.isSidebarCompact);

  useEffect(() => {
    if (!isAuthorized) return;

    api.me.user()
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch(() => {
        localStorage.removeItem("token")
      });
  }, [ isAuthorized ]);


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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainLayout}>
        { elSidebar }
        <div className={styles.scrollContainer}>
          <AppHeader />

          <div className={styles.content}>
            <div className={styles.scroll} ref={refScrollbar}>
              <div>
                { children }

                <AppFooter />
              </div>
            </div>
          </div>
        </div>
        <AppPlayer />
      </div>
    </div>
  );
}

export default MainLayout;
