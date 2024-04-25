import styles from "./SidebarListView.module.scss"
import { IEntityBase } from "types/entityBase";
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter } from "utils/string";
import { useSearchContext } from "context/SearchContext";
import EntityImage from "components/Common/EntityImage/EntityImage";
import HighlightedText from "components/HighlightedText/HighlightedText";
import EntityOwner from "components/Common/EntityOwner/EntityOwner";

interface IProps {
  arrData: (IPlaylist | IAlbum | IArtist)[]
}

function SidebarListView({ arrData }: IProps) {
  const { keyword } = useSearchContext();
  function makeUrl(entity: IEntityBase): string {
    return `/${entity.type}/${entity.id}`;
  }

  const arrFilteredData = !!keyword ? arrData.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase())) : arrData;

  const elItems = arrFilteredData.map((item) => {
    return (
      <NavLink to={makeUrl(item)} key={item.id} className={({ isActive }) => isActive ? styles.active : ""}>
        <div className={styles.imageContainer}>
          <EntityImage entity={item} isRounded={false} />
        </div>
        <div className={styles.infoContainer}>
          <HighlightedText className={styles.title} text={item.name} />
          <p className={styles.subtitle}>
            <span className={styles.entityType}>{ capitalizeFirstLetter(item.type) }</span>
            <EntityOwner entity={item} />
          </p>
        </div>
      </NavLink>
    )
  })


  return (
    <div className={ styles.sidebarListView }>
      { elItems }
    </div>
  )
}

export default SidebarListView;
