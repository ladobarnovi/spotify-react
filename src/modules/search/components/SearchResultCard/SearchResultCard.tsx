import styles from "./SearchResultCard.module.scss"
import { IEntityBase } from "types/entityBase";
import EntityImage from "components/Common/EntityImage/EntityImage";
import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";
import { IAlbum } from "types/album";
import { ITrack } from "types/track";
import ArtistList from "components/ArtistList/ArtistList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IProps {
  data: IEntityBase;
  onNavigated?: (entity: IEntityBase) => void;
}

export default function SearchResultCard({ data, onNavigated }: IProps) {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const navigate = useNavigate();

  if (data == null) return null;

  const isImageRounded = data.type === "artist" || data.type === "user";

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
            entity={data}
            isRounded={isImageRounded}
          />
        </div>

        <CardInfo data={data} />

        <div className={`${styles.buttonContainer} ${isPlaying ? styles.active : ""}`}>
          <ContextPlayButton onPlayStateChanged={setIsPlaying} uri={data.uri} />
        </div>
      </div>
    </div>
  )
}


interface ICardInfoProps {
  data: IEntityBase;
}
function CardInfo({ data }: ICardInfoProps) {
  const { name, type } = data;

  return (
    <div className={styles.cardInfo}>
      <p className={styles.name}>{name}</p>

      <div className={styles.rowWrapper}>
        <CardOwner data={data} />
        <span className={styles.type}>
          {type}
        </span>
      </div>
    </div>
  )
}

interface ICardOwnerProps {
  data: IEntityBase;
}
function CardOwner({ data }: ICardOwnerProps) {
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

  return <></>;
}