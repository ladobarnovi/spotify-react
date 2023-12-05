import styles from "./Main.module.scss";
import { ReactNode, useEffect } from "react";
import { api } from "api";
import { setUser } from "store/auth/authSlice";
import { setScrollDistance } from "store/global/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useScroll } from "hooks/useScroll";
import { RootState } from "store";
import AppPlayer from "components/AppPlayer/AppPlayer";
import AppSidebarCompact from "components/AppSidebar/AppSidebarCompact/AppSidebarCompact";
import AppSidebar from "components/AppSidebar/AppSidebar";
import AppHeader from "components/AppHeader/AppHeader";


type Props = {
  children: ReactNode
}

function Main({ children }: Props) {
  const dispatch = useDispatch();
  const { overlayScrollbar, refScrollbar } = useScroll();

  const isSidebarCompact = useSelector((state: RootState) => state.globalReducer.isSidebarCompact);

  useEffect(() => {
    api.me.user()
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch(() => {
        localStorage.removeItem("token")
      });
  }, []);


  useEffect(() => {
    if (refScrollbar.current != null && overlayScrollbar != null) {
      overlayScrollbar.on("scroll", (e) => {
        dispatch(setScrollDistance(e.elements().content.scrollTop));
      })
    }
  }, [ overlayScrollbar ])

  const elSidebar = isSidebarCompact ? <AppSidebarCompact /> : <AppSidebar />

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
              </div>
            </div>
          </div>
        </div>
        <AppPlayer />
      </div>
    </div>
  );
}

export default Main;
