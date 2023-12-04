import styles from "./SearchResultCard.module.scss"
import { IEntityBase } from "types/entityBase";
import EntityImage from "components/Common/EntityImage/EntityImage";
import { NavLink } from "react-router-dom";
import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";
import { IAlbum } from "types/album";
import { IImage } from "types/common";
import { ITrack } from "types/track";
import ArtistList from "components/ArtistList/ArtistList";
import { IArtist } from "types/artist";

interface IProps {
  data: IEntityBase;
}

function SearchResultCard({ data }: IProps) {
  if (data == null) return null;

  const image: IImage = (() => {
    if (data.type === "track") {
      return (data as ITrack).album.images[0];
    }

    return data.images[0];
  })();
  const isImageRounded = data.type === "artist" || data.type === "user";

  const elOwner = (() => {
    if (data.type === "album") {
      const owner = (data as IAlbum).artists[0].name;
      return (<span className={ styles.ownerArtist }>{ owner }</span>);
    }
    else if (data.type === "playlist") {
      const owner = data.owner.display_name;
      return (
        <span className={ styles.ownerForPlaylist }>By { owner }</span>
      )
    }
    else if (data.type === "track") {
      const track = data as ITrack;
      const elExplicit = track.explicit ? (
        <div className={styles.explicit}>
          <span>E</span>
        </div>
      ) : null;
      return (
        <span className={styles.ownerForTrack}>
          { elExplicit }
          <ArtistList artists={track.artists} />
        </span>
      )
    }

    return null;
  })();

  return (
    <div className={styles.searchResultCard}>
      <p className={styles.title}>
        Top Result
      </p>

      <NavLink to={"/"} className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          <EntityImage
            image={image}
            isRounded={isImageRounded}
          />
        </div>

        <p className={styles.name}>{ data.name }</p>
        <div className={styles.additionalInfo}>
          { elOwner }

          <span className={styles.type}>
            { data.type }
          </span>
        </div>

        <div className={styles.buttonContainer}>
          <ContextPlayButton uri={data.uri} />
        </div>
      </NavLink>
    </div>
  )
}

export default SearchResultCard;
