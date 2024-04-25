import styles from "./EntityCard.module.scss";
import { IEntityBase } from "types/entityBase";
import { MouseEvent } from "react";
import ArtistList from "components/ArtistList/ArtistList";
import { IAlbum } from "types/album";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "utils/string";
import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";
import IconClose from "components/Icons/IconClose";
import { IEpisode, IPodcast } from "types/podcast";
import EntityImage from "../Common/EntityImage/EntityImage";

export interface ICardOptions {
  album: {
    showReleaseYear?: boolean;
    showType?: boolean;
  }
}

interface IProps {
  data: IEntityBase;
  options?: ICardOptions;
  onNavigated?: (entity: IEntityBase) => void;
  onClosed?: (entity: IEntityBase) => void;
}

function EntityCard({ data, options, onNavigated, onClosed }: IProps) {
  const navigate = useNavigate();
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

    if (data.type === "show") {
      return (data as IPodcast).publisher
    }

    if (data.type === "episode") {
      const episode = data as IEpisode
      const date = moment(episode.release_date).format("MMM DD")
      const minutes = Math.floor(episode.duration_ms / 1000 / 60);

      return `${date} • ${minutes} min`;
    }
  })();

  function navigateToItem(): void {
    if (data.type === "track") return;

    if (onNavigated != null) {
      onNavigated(data);
    }

    navigate(entityUrl);
  }

  function onClosedClickHandler(e: MouseEvent): void {
    e.stopPropagation();

    if (onClosed != null) {
      onClosed(data);
    }
  }

  const elClose = onClosed ? (
    <button className={styles.buttonClose} onClick={onClosedClickHandler}>
      <IconClose />
    </button>
  ) : null;

  return (
    <div onClick={navigateToItem} className={styles.entityCard}>
      <div className={`${styles.imageContainer}`}>
        <div className={`${styles.imageMask} ${isRounded ? styles.rounded : ""}`}>
          <EntityImage
            entity={data}
            isRounded={false}
          />
        </div>

        <div className={styles.buttonContainer}>
          <ContextPlayButton uri={data.uri} />
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
      { elClose }
    </div>
  )
}

export default EntityCard;
