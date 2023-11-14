import styles from "./AuthButton.module.scss";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

function AuthButton({ children, onClick }: Props) {

  return (
    <button className={styles.authButton} onClick={onClick}>
      { children }
    </button>
  );
}

export default AuthButton;
