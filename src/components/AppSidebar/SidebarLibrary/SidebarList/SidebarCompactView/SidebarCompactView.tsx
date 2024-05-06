import styles from "./SidebarCompactView.module.scss"
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter } from "utils/string";
import HighlightedText from "../../../../HighlightedText/HighlightedText";
import { useSearchContext } from "../../../../../context/SearchContext";

interface IProps {
  arrData: (IPlaylist | IAlbum | IArtist)[]
}

function SidebarCompactView({ arrData }: IProps) {
  const { keyword } = useSearchContext();
  const arrFilteredData = keyword.trim() ? arrData.filter((item) => item.name.toLowerCase().includes(keyword)) : arrData;

  const elItems = arrFilteredData.map((item) => {
    return (
      <NavLink to={`/${item.type}/${item.id}`} key={item.id} className={styles.item}>
        <HighlightedText className={styles.title} text={ item.name } />
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
