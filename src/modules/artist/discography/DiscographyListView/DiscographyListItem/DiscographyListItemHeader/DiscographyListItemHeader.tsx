import styles from "./DiscographyListItemHeader.module.scss"
import { IAlbum } from "types/album";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter } from "utils/string";
import dayjs from "dayjs";
import IconHeart from "components/Icons/IconHeart";
import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";

interface IProps {
  album: IAlbum;
}

function DiscographyListItemHeader({ album }: IProps) {
  const imageUrl = album.images[0].url;
  const name = album.name;
  const id = album.id;
  const releaseYear = dayjs(album.release_date).format("YYYY");
  const albumType = capitalizeFirstLetter(album.album_type);
  const totalTracks = album.total_tracks;

  return (
    <div className={ styles.discographyListItemHeader }>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} />
      </div>

      <div className={styles.infoContainer}>
        <NavLink to={`/album/${id}`} className={styles.name}>{ name }</NavLink>
        <p className={styles.moreInfo}>
          <span>{ albumType }</span>
          <span> • </span>
          <span>{ releaseYear }</span>
          <span> • </span>
          <span>{ totalTracks }</span>
        </p>

        <div className={styles.albumActions}>
          <ContextPlayButton uri={album.uri} />

          <div className={styles.likeButton}>
            <IconHeart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscographyListItemHeader;
