import styles from "./EntityHeaderWrapper.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { imageColor } from "utils/image";
import { useDispatch } from "react-redux";
import { setHeaderColor } from "store/global/globalSlice";
import { IImage } from "types/common";
import EntityHeaderTitle from "components/EntityHeaderTitle/EntityHeaderTitle";

type TPaddingOptions = "small" | "medium" | "large";

interface IProps {
  children?: ReactNode;
  padding?: TPaddingOptions;
  image: IImage;
  title: string;
  type?: string;
}

function EntityHeaderWrapper({ children, padding, image, type, title, }: IProps) {
  const dispatch = useDispatch();
  const mainRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const imageUrl = image?.url;

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

      dispatch(setHeaderColor(rgb));

      return () => dispatch(setHeaderColor(null));
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

  const elType = type == null ? null : <p className={styles.type}>{type}</p>
  const elTitle = title == null ? null : <EntityHeaderTitle title={title} />

  return (
    <div ref={ mainRef } className={`${styles.entityHeaderWrapper} ${paddingClass}`}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt="" />
      </div>

      <div className={styles.infoContainer}>
        { elType }
        { elTitle }
        { children }
      </div>

      <div ref={ shadowRef } className={styles.shadow}></div>
    </div>
  );
}

export default EntityHeaderWrapper;
