import styles from "./TrackListGridWrapper.module.scss";
import { ReactNode } from "react";
import { useTrackListContext } from "../TrackListContext";

interface IProps {
  children: ReactNode;
  className?: string;
}
export default function TrackListGridWrapper({ children, className }: IProps) {
  const { colCount } = useTrackListContext();

  const colClass = styles[`col${colCount}`];
  return (
    <div className={`${styles.gridWrapper} ${colClass} ${className}`}>
      { children }
    </div>
  )
}