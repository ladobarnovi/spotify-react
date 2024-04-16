import styles from "./SidebarGridView.module.scss"
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { NavLink } from "react-router-dom";
import EntityImage from "components/Common/EntityImage/EntityImage";
import { capitalizeFirstLetter } from "utils/string";
import EntityOwner from "../../../../Common/EntityOwner/EntityOwner";

interface IProps {
  arrData: (IPlaylist | IAlbum | IArtist)[]
}

function SidebarGridView({ arrData }: IProps) {
  const elItems = arrData.map((item) => {
    return (
      <NavLink to={`/`} key={item.id} className={styles.item}>
        <div className={styles.imageContainer}>
          <EntityImage
            entity={item}
            isRounded={item.type === "artist"}
          />
        </div>
        <p className={styles.title}>{ item.name }</p>
        <p className={styles.subtitle}>
          <span className={styles.entityType}>{ capitalizeFirstLetter(item.type) }</span>
          <EntityOwner entity={item} />
        </p>

      </NavLink>
    )
  })

  return (
    <div className={ styles.sidebarGridView }>
      { elItems }
    </div>
  )
}

export default SidebarGridView;
