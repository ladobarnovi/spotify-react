import styles from "./DiscographyHeader.module.scss"
import IconList from "components/Icons/IconList";
import IconGrid from "components/Icons/IconGrid";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect, useState } from "react";
import DiscographyFilterContextMenu
  from "modules/artist/discography/DiscographyHeader/DiscographyFilterContextMenu/DiscographyFilterContextMenu";
import { EAlbumType } from "types/album";

export enum EDiscographyLayoutTypes {
  grid = "grid",
  list = "list",
}

interface IProps {
  name: string;
  layoutType: EDiscographyLayoutTypes;
  onLayoutChanged: (type: EDiscographyLayoutTypes) => void;
  onAlbumTypeChanged: (type: EAlbumType) => void;
}

function DiscographyHeader({ name, onLayoutChanged, layoutType, onAlbumTypeChanged }: IProps) {
  const [ isScrolledClass, setIsScrolledClass ] = useState("");
  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);

  useEffect(() => {
    setIsScrolledClass(scrollDistance > 0 ? styles.scrolled : "");
  }, [ scrollDistance ])

  return (
    <div className={`${styles.discographyHeader} ${isScrolledClass}`}>
      <p className={styles.title}>{ name }</p>

      <div className={styles.controls}>

        <DiscographyFilterContextMenu onAlbumTypeChanged={onAlbumTypeChanged} />
        <div className={styles.layouts}>
          <button
            onClick={() => onLayoutChanged(EDiscographyLayoutTypes.list)}
            className={`${styles.buttonList} ${layoutType === EDiscographyLayoutTypes.list ? styles.active : ""}`}
          >
            <IconList />
          </button>
          <button
            onClick={() => onLayoutChanged(EDiscographyLayoutTypes.grid)}
            className={`${styles.buttonGrid} ${layoutType === EDiscographyLayoutTypes.grid ? styles.active : ""}`}
          >
            <IconGrid />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DiscographyHeader;
