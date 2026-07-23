import styles from "./SidebarGridView.module.scss"
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { NavLink } from "react-router-dom";
import EntityImage from "components/Common/EntityImage/EntityImage";
import { capitalizeFirstLetter } from "utils/string";
import EntityOwner from "../../../../Common/EntityOwner/EntityOwner";
import { useSearchContext } from "../../../../../context/SearchContext";
import HighlightedText from "../../../../HighlightedText/HighlightedText";

interface IProps {
  arrData: (IPlaylist | IAlbum | IArtist)[]
}

function SidebarGridView({ arrData }: IProps) {
  const { keyword } = useSearchContext();
  const arrFilteredData = keyword.trim() ? arrData.filter((item) => item.name.toLowerCase().includes(keyword)) : arrData;

  const elItems = arrFilteredData.map((item) => {
    return (
      <NavLink to={`/`} key={item.id} className={styles.item}>
        <div className={styles.imageContainer}>
          <EntityImage
            entity={item}
            isRounded={item.type === "artist"}
          />
        </div>
        <HighlightedText className={styles.title} text={item.name} />
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
