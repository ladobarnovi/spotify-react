import styles from "./LinkUnderline.module.scss";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  className?: string;
  url: string;
  children: ReactNode;
}

function LinkUnderline({ className, url, children }: IProps) {
  return (
    <NavLink to={url} className={`${styles.linkUnderline} ${className}`}>
      { children }
    </NavLink>
  )
}

export default LinkUnderline;
