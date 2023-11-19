import styles from "./TrackList.module.scss";
import { ITrack, ITrackContainer } from "types/track";
import ArtistList from "components/ArtistList/ArtistList";
import { NavLink } from "react-router-dom";
import IconDuration from "components/Icons/IconDuration";
import IconEllipsis from "components/Icons/IconEllipsis";
import { useEffect, useRef, useState } from "react";
import IconPlay from "components/Icons/IconPlay";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { formatNumber } from "utils/number";

export enum ETrackListLayoutType {
  album = "album",
  playlist = "playlist",
  topTracks = "topTracks",
}

interface ITrackListProps {
  arrTrackContainer: ITrackContainer[]|null;
  layoutType: ETrackListLayoutType;
  totalTracks?: number;
  canHeaderStick?: boolean; // default: true
  isCompact?: boolean;
}

interface ITrackItemProps {
  track: ITrack;
  date: string;
  index: number;
  layoutType: ETrackListLayoutType;
  isSelected: boolean;
  onSelect: (string: string) => void;
  isCompact?: boolean;
}

function TrackList({ arrTrackContainer, layoutType, canHeaderStick = true, isCompact }: ITrackListProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);
  const [ isHeaderFixed, setIsHeaderFixed ] = useState(false);
  const [ selectedTrackId, setSelectedTrackId ] = useState<string|null>(null);

  useEffect(() => {
    if (headerRef.current == null || !canHeaderStick) return;

    const top = headerRef.current.getBoundingClientRect().top;
    top <= 72 ? setIsHeaderFixed(true) : setIsHeaderFixed(false);
  }, [ scrollDistance ]);

  const elTrackItems = (() => {
    if (arrTrackContainer == null) {
      return Array.from({length: 8}, () => <TrackItemShimmering />)
    }

    return arrTrackContainer.map((trackContainer, index) => {
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
          isSelected={track.id === selectedTrackId}
          onSelect={(id) => { setSelectedTrackId(id) }}
          isCompact={isCompact}
        />
      );
    });
  })()

  const elColAlbum = layoutType === "playlist" ? (<div className={styles.colAlbum}>Album</div>) : null;
  const elColDateAdded = layoutType === "playlist" ? (<div className={styles.colDate}>Date added</div>) : null;
  const elColArtist = isCompact ? (<div className={styles.colArtist}>Artist</div>) : null;

  const trackListLayoutClass = (() => {
    if (layoutType === ETrackListLayoutType.playlist) { return styles.playlist; }
    if (layoutType === ETrackListLayoutType.album) { return styles.album; }
    if (layoutType === ETrackListLayoutType.topTracks) { return styles.topTracks; }
    return null
  })();

  const elHeader = layoutType === "topTracks" ? null : (
    <div ref={headerRef} className={`${styles.listHeader} ${styles.gridItem} ${isHeaderFixed ? styles.fixed : ""}`}>
      <div className={styles.colNumber}>#</div>
      <div className={styles.colTitle}>Title</div>
      { elColArtist }
      { elColAlbum }
      { elColDateAdded }
      <div className={styles.colDuration}>
        <IconDuration />
      </div>
    </div>
  );

  return (
    <div className={`${styles.trackList} ${trackListLayoutClass} ${isCompact ? styles.compact : ""}`}>
      { elHeader }
      <div className={styles.listBody}>
        { elTrackItems }
      </div>
    </div>
  );
}

function TrackItem({ track, date, index, layoutType, isSelected, onSelect, isCompact }: ITrackItemProps) {
  const duration = (() => {
    const minutes = Math.floor(track.duration_ms / 1000 / 60) + "";
    const seconds = (
      Math.floor((track.duration_ms / 1000) % 60) + ""
    ).padStart(2, "0");

    return `${minutes}:${seconds}`;
  })();

  const elImage = track.album == null || isCompact ? null : <img src={track.album.images[0]?.url} alt={track.album.name} />
  const elColAlbum = layoutType === "playlist" ? (
    <div className={styles.colAlbum}>
      <NavLink to={`/album/${track.album.id}`}>{ track.album.name }</NavLink>
    </div>
  ) : null;
  const elColDateAdded = layoutType === "playlist" ? (<div className={styles.colDate}>{ date }</div>) : null;
  const elColPlays = layoutType === "topTracks" ? (
    <div className={styles.colPlays}>
      { formatNumber(Math.floor(Math.random() * 10000)) }
    </div>
  ) : null;

  const elColArtist = isCompact ? (<ArtistList artists={track.artists} />) : null;

  const elArtists = (() => {
    if (layoutType === "topTracks" || isCompact) return;

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
    <div onClick={() => onSelect(track.id)} className={`${styles.trackItem} ${styles.gridItem} ${isSelected ? styles.selected : null}`}>
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
      { elColArtist }
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

function TrackItemShimmering() {
  return (
    <div className={`${styles.trackItemShimmering} ${styles.gridItem}`}>
      <div className={styles.colNumber}>
        <div />
      </div>
      <div className={styles.colTitle}>
        <div />
        <div />
      </div>
      <div className={styles.colDuration}>
        <div />
      </div>
    </div>
  );
}

export default TrackList;
