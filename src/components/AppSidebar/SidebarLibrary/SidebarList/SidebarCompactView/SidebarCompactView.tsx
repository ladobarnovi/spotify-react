import styles from "./SidebarCompactView.module.scss"
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter, filterByKeyword } from "utils/string";
import HighlightedText from "components/HighlightedText/HighlightedText";
import { useSearchContext } from "context/SearchContext";
import { usePlayer } from "hooks/usePlayer";

interface IProps {
  arrData: (IPlaylist | IAlbum | IArtist)[]
}

function SidebarCompactView({ arrData }: IProps) {
  const { keyword } = useSearchContext();
  const arrFilteredData = filterByKeyword(arrData, keyword);
  const { getIsInPlayback } = usePlayer();

  const elItems = arrFilteredData.map((item) => {
    const isInPlayback = getIsInPlayback(item);

    return (
      <NavLink
        to={`/${item.type}/${item.id}`}
        key={item.id}
        className={({ isActive }) => `${isActive ? styles.active : ""} ${isInPlayback ? styles.playback : ""}`}
      >
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
