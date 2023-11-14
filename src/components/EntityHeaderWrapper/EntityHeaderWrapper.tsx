import styles from "./EntityHeaderWrapper.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { imageColor } from "utils/image";

type TPaddingOptions = "small" | "medium" | "large";

interface IProps {
  children?: ReactNode;
  imageUrl: string;
  padding?: TPaddingOptions;
}

function EntityHeaderWrapper({ children, imageUrl, padding }: IProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (mainRef.current == null || shadowRef.current == null) {
        return;
      }

      const rgb = await imageColor(imageUrl);
      if (rgb == null) {
        return;
      }

      mainRef.current.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      shadowRef.current.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    })()
  }, [ imageUrl ])

  const paddingClass = (() => {
    if (padding === "small") {
      return styles.paddingSmall;
    }
    if (padding === "medium") {
      return styles.paddingMedium;
    }
    if (padding === "large") {
      return styles.paddingLarge;
    }

    return styles.paddingMedium;
  })();

  return (
    <div ref={ mainRef } className={`${styles.entityHeaderWrapper} ${paddingClass}`}>
      { children }

      <div ref={ shadowRef } className={styles.shadow}></div>
    </div>
  );
}

export default EntityHeaderWrapper;
