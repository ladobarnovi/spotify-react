import styles from "./SidebarCompactView.module.scss"
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter } from "utils/string";

interface IProps {
  arrData: (IPlaylist | IAlbum | IArtist)[]
}

function SidebarCompactView({ arrData }: IProps) {
  const elItems = arrData.map((item) => {
    return (
      <NavLink to={`/${item.type}/${item.id}`} key={item.id} className={styles.item}>
        <span className={styles.title}>{ item.name }</span>
        <span>•</span>
        <span className={styles.entityType}>{ capitalizeFirstLetter(item.type) }</span>
      </NavLink>
    )
  })

  return (
    <div className={ styles.sidebarCompactView }>
      { elItems }
    </div>
  )
}

export default SidebarCompactView;
