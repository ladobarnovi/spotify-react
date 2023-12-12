import styles from "./EntityHeaderWrapper.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { imageColor } from "utils/image";
import { useDispatch } from "react-redux";
import { setHeaderColor } from "store/global/globalSlice";
import { IImage } from "types/common";
import EntityHeaderTitle from "components/EntityHeaderTitle/EntityHeaderTitle";
import IconArtist from "components/Icons/IconArtist";

type TPaddingOptions = "small" | "medium" | "large";

interface IProps {
  children?: ReactNode;
  padding?: TPaddingOptions;
  image: IImage;
  isImageRounded?: boolean;
  title: string;
  type?: string;
}

function EntityHeaderWrapper({ children, padding, image, type, title, isImageRounded = false, }: IProps) {
  const dispatch = useDispatch();
  const mainRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (mainRef.current == null || shadowRef.current == null) {
        return;
      }

      const rgb = await imageColor(image?.url);
      if (rgb == null) {
        return;
      }

      mainRef.current.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      shadowRef.current.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

      dispatch(setHeaderColor(rgb));

      return () => dispatch(setHeaderColor(null));
    })()
  }, [ image ])

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

  const elImage = (() => {
    if (image == null) {
      return <IconArtist />
    }

    return (<img src={image.url} alt={title}/>);
  })()

  const elType = type == null ? null : <p className={styles.type}>{type}</p>
  const elTitle = title == null ? null : <EntityHeaderTitle title={title} />

  const classIsRounded = isImageRounded ? styles.rounded : "";

  return (
    <div ref={mainRef} className={`${styles.entityHeaderWrapper} ${paddingClass}`}>
      <div className={`${styles.imageContainer} ${classIsRounded}`}>
        { elImage }
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
