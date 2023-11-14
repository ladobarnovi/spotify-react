import styles from "./TrackList.module.scss";
import { ITrack, ITrackContainer } from "types/track";
import ArtistList from "components/ArtistList/ArtistList";
import { NavLink } from "react-router-dom";
import IconDuration from "components/Icons/IconDuration";
import IconEllipsis from "components/Icons/IconEllipsis";
import { useState } from "react";
import IconPlay from "components/Icons/IconPlay";
import moment from "moment";

type TLayoutType = "album" | "playlist" | "topTracks";

interface ITrackListProps {
  arrTrackContainer: ITrackContainer[];
  layoutType: TLayoutType;
}

interface ITrackItemProps {
  track: ITrack;
  date: string;
  index: number;
  layoutType: TLayoutType;
}

function TrackList({ arrTrackContainer, layoutType }: ITrackListProps) {
  const elTrackItems = arrTrackContainer.map((trackContainer, index) => {
    const track = trackContainer.track;
    const date = trackContainer.added_at.split("T")[0];
    const formattedDate = moment(date).format("MMM DD, yyyy");

    return (
      <TrackItem
        key={track.id}
        track={track}
        date={formattedDate}
        index={index + 1}
        layoutType={layoutType}
      />
    );
  });

  const elColAlbum = layoutType === "playlist" ? (<div className={styles.colAlbum}>Album</div>) : null;
  const elColDateAdded = layoutType === "playlist" ? (<div className={styles.colDate}>Date added</div>) : null;

  const trackListLayoutClass = (() => {
    if (layoutType === "playlist") { return styles.playlist; }
    if (layoutType === "album") { return styles.album; }
    if (layoutType === "topTracks") { return styles.topTracks; }

    return null
  })()

  const elHeader = layoutType === "topTracks" ?? (
    <div className={`${styles.listHeader} ${styles.gridItem}`}>
      <div className={styles.colNumber}>#</div>
      <div className={styles.colTitle}>Title</div>
      { elColAlbum }
      { elColDateAdded }
      <div className={styles.colDuration}>
        <IconDuration />
      </div>
    </div>
  )

  return (
    <div className={`${styles.trackList} ${trackListLayoutClass}`}>
      { elHeader }
      <div className={styles.listBody}>
        { elTrackItems }
      </div>
    </div>
  );
}

function TrackItem({ track, date, index, layoutType }: ITrackItemProps) {
  const [ selectedTrackId, setSelectedTrackId ] = useState<string|null>(null);

  const duration = (() => {
    const minutes = Math.floor(track.duration_ms / 1000 / 60) + "";
    const seconds = (
      Math.floor((track.duration_ms / 1000) % 60) + ""
    ).padStart(2, "0");

    return `${minutes}:${seconds}`;
  })();

  const elImage = track.album == null ? null : <img src={track.album.images[0]?.url} alt={track.album.name} />
  const elColAlbum = layoutType === "playlist" ? (
    <div className={styles.colAlbum}>
      <NavLink to={`/album/${track.album.id}`}>{ track.album.name }</NavLink>
    </div>
  ) : null;
  const elColDateAdded = layoutType === "playlist" ? (<div className={styles.colDate}>{ date }</div>) : null;
  const elColPlays = layoutType === "topTracks" ? (<div className={styles.colPlays}>{ Math.floor(Math.random() * 10000) }</div>) : null;

  const elArtists = (() => {
    if (layoutType === "topTracks") return;

    const elExplicit = track.explicit ? (
      <div className={styles.explicit}>
        <span>E</span>
      </div>
    ) : null;

    return (
      <div className={styles.artists}>
        { elExplicit }
        <ArtistList artists={track.artists} />
      </div>
    )
  })()

  return (
    <div onClick={() => setSelectedTrackId(track.id)} className={`${styles.trackItem} ${styles.gridItem} ${selectedTrackId === track.id ? styles.selected : null}`}>
      <div className={styles.colNumber}>
        <p className={styles.index}>{ index }</p>
        <div className={styles.playbackActions}>
          <IconPlay />
        </div>
      </div>
      <div className={styles.colTitle}>
        { elImage }
        <div className={styles.trackInfo}>
          <p className={styles.name}>{ track.name }</p>
          { elArtists }
        </div>
      </div>
      { elColAlbum }
      { elColDateAdded }
      { elColPlays }
      <div className={styles.colDuration}>
        <p>{ duration }</p>
        <div className={styles.moreActions}>
          <IconEllipsis />
        </div>
      </div>
    </div>
  )
}

export default TrackList;
