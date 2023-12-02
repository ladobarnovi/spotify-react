import styles from "./EntityCard.module.scss";
import { IEntityBase } from "types/entityBase";
import ArtistList from "components/ArtistList/ArtistList";
import { IAlbum } from "types/album";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter } from "utils/string";
import PlayButton from "components/PlayButton/PlayButton";

export interface ICardOptions {
  album: {
    showReleaseYear?: boolean;
    showType?: boolean;
  }
}

interface IProps {
  data: IEntityBase;
  options?: ICardOptions;
}

function EntityCard({ data, options }: IProps) {
  const imageUrl = data.images[0]?.url;
  const isRounded = data.type === "artist";
  const entityUrl = `/${data.type}/${data.id}`;

  const elSecondaryInfo = (() => {
    if (data.type === "album") {
      const album = data as IAlbum;
      if (options?.album.showReleaseYear) {
        let info = moment(album.release_date).format("YYYY");

        if (options.album.showType) {
          info += ` • ${capitalizeFirstLetter(album.album_type)}`;
        }

        return info;
      }

      return <ArtistList artists={album.artists} />;
    }

    if (data.type === "playlist") {
      return `By ${data.owner.display_name}`
    }

    if (data.type === "artist") {
      return "Artist";
    }
  })();

  return (
    <NavLink to={entityUrl} className={styles.entityCard}>
      <div className={`${styles.imageContainer}`}>
        <div className={`${styles.imageMask} ${isRounded ? styles.rounded : ""}`}>
          <img src={imageUrl} alt={data.name} />
        </div>

        <div className={styles.buttonContainer}>
          <PlayButton />
        </div>
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
