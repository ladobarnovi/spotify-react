import styles from "./TracklistHeader.module.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import EditPlaylistPopup, { IEditPlaylistPopupData } from "components/EditPlaylistPopup/EditPlaylistPopup";
import { IArtist } from "types/artist";
import ArtistList from "components/ArtistList/ArtistList";
import EntityHeaderWrapper from "components/EntityHeaderWrapper/EntityHeaderWrapper";
import EntityHeaderTitle from "components/EntityHeaderTitle/EntityHeaderTitle";

export interface ITrackListHeaderOptions {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  description?: string;
  owner?: {
    id: string;
    display_name: string;
  };
  totalTracks?: number;
  duration?: string;
  artists?: IArtist[],
}

interface IProps {
  options: ITrackListHeaderOptions;
}

function TracklistHeader({ options }: IProps) {
  const [ isIditingOn, setIsEditingOn ] = useState(false);

  const { id, title, description, imageUrl, type, owner, totalTracks, duration, artists } = options;

  const elDescription = description == null ? null : (
    <p className={ styles.description }>{ description }</p>
  );

  const elOwner = (() => {
    if (artists != null) {
      return (
        <div className={styles.artists}>
          <ArtistList artists={artists} />
        </div>
      );
    }

    if (owner != null) {
      return (
        <NavLink to={`/user/${owner?.id}`} className={ styles.owner }>
          <p>{ owner?.display_name }</p>
        </NavLink>
      );
    }

    return null;
  })();

  const editPlaylistPopupData: IEditPlaylistPopupData = {
    id,
    name: title,
    description,
    imageUrl,
  }
  const elEditPlaylistPopup = isIditingOn ? <EditPlaylistPopup playlistData={editPlaylistPopupData} onClose={closeEdit} /> : null;

  function openEdit() {
    setIsEditingOn(true);
  }

  function closeEdit() {
    setIsEditingOn(false);
  }

  return (
    <EntityHeaderWrapper imageUrl={imageUrl}>
      <div className={ styles.imageContainer }>
        <img src={ imageUrl } alt={ title }/>
      </div>
      <div className={ styles.infoContainer }>
        <p className={ styles.type }>{ type }</p>
        <EntityHeaderTitle onClick={openEdit} title={title} />
        { elDescription }
        <div className={ styles.additionalInfo }>
          { elOwner }
          <span className={ styles.separator }> • </span>
          <p>{ totalTracks } songs,</p>
          <p>{ duration }</p>
        </div>
      </div>

      { elEditPlaylistPopup }
    </EntityHeaderWrapper>
  );
}

export default TracklistHeader;
