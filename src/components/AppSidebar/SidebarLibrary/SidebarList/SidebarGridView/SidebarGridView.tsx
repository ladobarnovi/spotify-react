import styles from "./SidebarGridView.module.scss"
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { NavLink } from "react-router-dom";
import EntityImage from "components/Common/EntityImage/EntityImage";
import { capitalizeFirstLetter } from "utils/string";

interface IProps {
  arrData: (IPlaylist | IAlbum | IArtist)[]
}

function SidebarGridView({ arrData }: IProps) {
  const elItems = arrData.map((item) => {
    const image = item.images ? item.images[0] : undefined;
    const elOwner = (() => {
      let owner = null;
      if (item.type === "album") {
        owner = (item as IAlbum).artists[0].name;
      }
      else if (item.type === "playlist") {
        owner = item.owner.display_name;
      }
      else {
        return null;
      }

      return (<span className={ styles.owner }> •  { owner }</span>);
    })();

    return (
      <NavLink to={`/`} key={item.id} className={styles.item}>
        <div className={styles.imageContainer}>
          <EntityImage
            image={image}
            isRounded={item.type === "artist"}
          />
        </div>
        <p className={styles.title}>{ item.name }</p>
        <p className={styles.subtitle}>
          <span className={styles.entityType}>{ capitalizeFirstLetter(item.type) }</span>
          { elOwner }
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
