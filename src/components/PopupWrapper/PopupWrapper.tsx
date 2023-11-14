import styles from "./PopupWrapper.module.scss";
import { createPortal } from "react-dom";
import { ReactNode } from "react";

interface IProps {
  children?: ReactNode
}

function PopupWrapper({ children }: IProps) {
  return (
    createPortal((
      <div className={styles.popupWrapper}>
        { children }
      </div>
    ), document.body)
  )
}

export default PopupWrapper;
