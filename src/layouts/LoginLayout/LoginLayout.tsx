import styles from "./LoginLayout.module.scss"
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

function LoginLayout({ children }: IProps) {
  return (
    <div className={styles.loginLayout}>
      { children }
    </div>
  )
}

export default LoginLayout;
