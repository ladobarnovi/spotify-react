import styles from "./EntityCard.module.scss";
import { IEntityBase } from "types/entityBase";
import ArtistList from "components/ArtistList/ArtistList";
import { IArtist } from "types/artist";
import { IAlbum } from "types/album";
import { IPlaylist } from "types/playlist";
import moment from "moment";
import { NavLink } from "react-router-dom";

export interface ICardOptions {
  album: {
    showReleaseYear: boolean;
  }
}

interface IProps {
  data: IEntityBase;
  options?: ICardOptions;
}

function EntityCard({ data, options }: IProps) {
  const imageUrl = data.images[0]?.url;
  const isRounded = true;
  const entityUrl = `/${data.type}/${data.id}`;

  const elSecondaryInfo = (() => {
    if (data.type === "album") {
      const album = data as IAlbum;
      if (options?.album.showReleaseYear) {
        return moment(album.release_date).format("YYYY");
      }

      return <ArtistList artists={album.artists} />;
    }

    if (data.type === "playlist") {
      return `By ${data.owner.display_name}`
    }
  })();

  return (
    <NavLink to={entityUrl} className={styles.entityCard}>
      <div className={`${styles.imageContainer} ${isRounded ? "rounded" : ""}`}>
        <img src={imageUrl} alt={data.name} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.primary}>
          { data.name }
        </div>
        <div className={styles.secondary}>
          { elSecondaryInfo }
        </div>
      </div>
    </NavLink>
  )
}

export default EntityCard;
