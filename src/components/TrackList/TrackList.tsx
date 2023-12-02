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
import { useResize } from "hooks/useResize";

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
  maxColCount?: number;
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
  isColDateHidden: boolean,
  isColAlbumHidden: boolean,
  isColArtistHidden: boolean,
  isColPlaysHidden: boolean,
}

function TrackList({ arrTrackContainer, layoutType, canHeaderStick = true, isCompact, onPlay, maxColCount = 6 }: ITrackListProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);
  const [ isHeaderFixed, setIsHeaderFixed ] = useState(false);
  const [ selectedTrackId, setSelectedTrackId ] = useState<string|null>(null);
  const [ colCount, setColCount ] = useState(maxColCount);

  const [ isColDateHidden, setIsColDateHidden ] = useState(false);
  const [ isColAlbumHidden, setIsColAlbumHidden ] = useState(false);
  const [ isColArtistHidden, setIsColArtistHidden ] = useState(false);
  const [ isColPlaysHidden, setIsColPlaysHidden ] = useState(false);


  const { addOnResize } = useResize();

  const classColCount = (() => {
    if (colCount === 6) { return styles.col6; }
    if (colCount === 5) { return styles.col5; }
    if (colCount === 4) { return styles.col4; }
    return styles.col3;
  })();
  const classIsCompact = isCompact ? styles.compact : "";

  function onResize(): void {
    const el = mainRef.current;
    if (el == null) return;

    const width = el.clientWidth;
    let count = 3;

    if (width > 980) { count = 6; }
    else if (width > 725) { count = 5; }
    else if (width > 510) { count = 4; }

    setColCount(Math.min(count, maxColCount));
  }

  useEffect(() => {
    if (headerRef.current == null || !canHeaderStick) return;

    const top = headerRef.current.getBoundingClientRect().top;
    top <= 72 ? setIsHeaderFixed(true) : setIsHeaderFixed(false);
  }, [ scrollDistance ]);

  useEffect(() => {
    const destructor = addOnResize(onResize);
    onResize();
    return () => destructor();
  }, [ isCompact ]);

  useEffect(() => {
    setIsColDateHidden(false);
    setIsColArtistHidden(false);
    setIsColAlbumHidden(false);
    setIsColPlaysHidden(false);

    if (colCount < 6) {
      if (layoutType === ETrackListLayoutType.playlist) {
        if (isCompact) { setIsColDateHidden(true); }
      }
    }
    if (colCount < 5) {
      if (layoutType === ETrackListLayoutType.playlist) {
        if (isCompact) { setIsColArtistHidden(true) }
        else { setIsColDateHidden(true) }
      }
    }
    if (colCount < 4) {
      if (layoutType === ETrackListLayoutType.playlist) {
        if (isCompact) { setIsColAlbumHidden(true) }
        else { setIsColAlbumHidden(true) }
      }
      else if (layoutType === ETrackListLayoutType.album) {
        if (isCompact) { setIsColArtistHidden(true) }
      }
      else if (layoutType === ETrackListLayoutType.topTracks) {
        setIsColPlaysHidden(true);
      }
    }

  }, [ colCount ]);

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
          isColAlbumHidden={isColAlbumHidden}
          isColArtistHidden={isColArtistHidden}
          isColDateHidden={isColDateHidden}
          isColPlaysHidden={isColPlaysHidden}
        />
      );
    });
  })()

  const elColAlbum = layoutType === "playlist" && !isColAlbumHidden ? (<div className={styles.colAlbum}>Album</div>) : null;
  const elColDateAdded = layoutType === "playlist" && !isColDateHidden ? (<div className={styles.colDate}>Date added</div>) : null;
  const elColArtist = isCompact && !isColArtistHidden ? (<div className={styles.colArtist}>Artist</div>) : null;

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
    <div ref={mainRef} className={`${styles.trackList} ${trackListLayoutClass} ${classColCount} ${classIsCompact}`}>
      { elHeader }
      <div className={styles.listBody}>
        { elTrackItems }
      </div>
    </div>
  );
}

function TrackItem({
  track,
  date,
  index,
  layoutType,
  isSelected,
  onSelect,
  isCompact,
  onPlay,
  isColAlbumHidden,
  isColArtistHidden,
  isColDateHidden,
  isColPlaysHidden
}: ITrackItemProps) {
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
  const elColAlbum = layoutType === "playlist" && !isColAlbumHidden ? (
    <div className={styles.colAlbum}>
      <NavLink to={`/album/${track.album.id}`}>{ track.album.name }</NavLink>
    </div>
  ) : null;
  const elColDateAdded = layoutType === "playlist" && !isColDateHidden ? (<div className={styles.colDate}>{ date }</div>) : null;
  const elColPlays = layoutType === "topTracks" && !isColPlaysHidden ? (
    <div className={styles.colPlays}>
      { numPlays }
    </div>
  ) : null;

  const elColArtist = isCompact && !isColArtistHidden ? (<ArtistList artists={track.artists} />) : null;

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
