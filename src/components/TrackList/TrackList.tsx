import styles from "./TrackList.module.scss";
import { ITrack, ITrackContainer } from "types/track";
import ArtistList from "components/ArtistList/ArtistList";
import { NavLink } from "react-router-dom";
import IconDuration from "components/Icons/IconDuration";
import IconEllipsis from "components/Icons/IconEllipsis";
import { MouseEvent, useEffect, useRef, useState } from "react";
import IconPlay from "components/Icons/IconPlay";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { formatNumber } from "utils/number";
import { usePlayer } from "hooks/usePlayer";
import IconPause from "components/Icons/IconPause";

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
  onPlay: (index: number) => void;
}

interface ITrackItemProps {
  track: ITrack;
  date: string;
  index: number;
  layoutType: ETrackListLayoutType;
  isSelected: boolean;
  onSelect: (string: string) => void;
  isCompact?: boolean;
  onPlay: () => void;
}

function TrackList({ arrTrackContainer, layoutType, canHeaderStick = true, isCompact, onPlay }: ITrackListProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);
  const [ isHeaderFixed, setIsHeaderFixed ] = useState(false);
  const [ selectedTrackId, setSelectedTrackId ] = useState<string|null>(null);

  useEffect(() => {
    if (headerRef.current == null || !canHeaderStick) return;

    const top = headerRef.current.getBoundingClientRect().top;
    top <= 72 ? setIsHeaderFixed(true) : setIsHeaderFixed(false);
  }, [ scrollDistance ]);

  function toggleTrackSelection(id: string): void {
    setSelectedTrackId(selectedTrackId === id ? null : id);
  }

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
          onSelect={toggleTrackSelection}
          isCompact={isCompact}
          onPlay={() => onPlay(index)}
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

function TrackItem({ track, date, index, layoutType, isSelected, onSelect, isCompact, onPlay }: ITrackItemProps) {
  const [ numPlays, setNumPlays ] = useState("");
  const { trackId, isPlaying, isPaused, togglePlay } = usePlayer();

  const isCurrentTrackPlaying = isPlaying && track.id === trackId;
  const isCurrentTrackPaused = isPaused && track.id === trackId;

  useEffect(() => {
    setNumPlays(formatNumber(Math.floor(Math.random() * 10000)));
  }, [ ])

  function onPlayHandler(e: MouseEvent<HTMLDivElement>): void {
    e.stopPropagation();

    if (isCurrentTrackPlaying || isCurrentTrackPaused) {
      togglePlay();
    }
    else {
      onPlay();
    }
  }

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
      { numPlays }
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

  const playbackActionIcon = (() => {
    if (track.id === trackId && isPlaying) {
      return (
        <div>
          <IconPause />
          <img className={styles.eq} src="/svg/eq.svg" alt="EQ"/>
        </div>
      )
    }

    return <IconPlay />;
  })()

  const classIsSelected = isSelected ? styles.selected : null
  const classIsPlaying = isCurrentTrackPlaying ? styles.playing : null;
  const classIsPaused = isCurrentTrackPaused ? styles.paused : null;

  return (
    <div onClick={() => onSelect(track.id)} className={`${styles.trackItem} ${styles.gridItem} ${classIsSelected} ${classIsPlaying} ${classIsPaused}`}>
      <div className={styles.colNumber}>
        <p className={styles.index}>{ index }</p>
        <div onClick={onPlayHandler} className={styles.playbackActions}>
          { playbackActionIcon }
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
