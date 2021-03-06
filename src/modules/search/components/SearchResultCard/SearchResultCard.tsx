import styles from "./SearchResultCard.module.scss"
import { IEntityBase } from "types/entityBase";
import EntityImage from "components/Common/EntityImage/EntityImage";
import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";
import { IAlbum } from "types/album";
import { IImage } from "types/common";
import { ITrack } from "types/track";
import ArtistList from "components/ArtistList/ArtistList";
import { useNavigate } from "react-router-dom";

interface IProps {
  data: IEntityBase;
  onNavigated?: (entity: IEntityBase) => void;
}

function SearchResultCard({ data, onNavigated }: IProps) {
  const navigate = useNavigate();

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

  function navigateToItem() {
    if (data.type === "track") return;

    if (onNavigated != null) {
      onNavigated(data);
    }

    navigate(`/${data.type}/${data.id}`);
  }

  return (
    <div className={styles.searchResultCard}>
      <p className={styles.title}>
        Top Result
      </p>

      <div onClick={navigateToItem} className={styles.cardContainer}>
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
      </div>
    </div>
  )
}

export default SearchResultCard;
