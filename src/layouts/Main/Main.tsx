import styles from "./Main.module.scss";
import { ReactNode, useEffect, useRef, useState } from "react";
import AppSidebar from "../../components/AppSidebar/AppSidebar";
import AppFooter from "../../components/AppFooter/AppFooter";
import AppHeader from "../../components/AppHeader/AppHeader";
import { api } from "api";
import { setAxiosToken } from "utils/axios";
import { setUser } from "store/auth/authSlice";
import { useDispatch } from "react-redux";
import { OverlayScrollbars } from "overlayscrollbars";

type Props = {
  children: ReactNode
}

function Main({ children }: Props) {
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    api.me.user()
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch(() => {
        localStorage.removeItem("token")
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  useEffect(() => {
    if (scrollRef.current != null && !isLoading) {
      console.log("Scroll Init")
      OverlayScrollbars(scrollRef.current, {
        scrollbars: {
          autoHide: 'scroll',
        },
      });
    }
  }, [ isLoading ])

  const elMain = !isLoading ?
    <div className={styles.mainLayout}>
      <AppSidebar />
      <div className={styles.scrollContainer}>
        <AppHeader />

        <div className={styles.content}>
          <div className={styles.scroll} ref={scrollRef}>
            <div>
              { children }
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div> : null;


  return (
    <div className={styles.mainContainer}>
      { elMain }
    </div>
  );
}

export default Main;
