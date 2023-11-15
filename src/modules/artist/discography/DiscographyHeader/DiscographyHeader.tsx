import styles from "./DiscographyHeader.module.scss"
import IconList from "components/Icons/IconList";
import IconGrid from "components/Icons/IconGrid";

export enum EDiscographyLayoutTypes {
  grid = "grid",
  list = "list",
}

interface IProps {
  name: string;
  layoutType: EDiscographyLayoutTypes;
  onLayoutChanged: (type: EDiscographyLayoutTypes) => void;
}

function DiscographyHeader({ name, onLayoutChanged, layoutType }: IProps) {
  return (
    <div className={styles.discographyHeader}>
      <p className={styles.title}>{ name }</p>

      <div className={styles.controls}>
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
