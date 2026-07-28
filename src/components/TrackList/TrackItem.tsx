import styles from "./TrackList.module.scss";
import { ITrack } from "types/track";
import ArtistList from "components/ArtistList/ArtistList";
import { NavLink } from "react-router-dom";
import IconEllipsis from "components/Icons/IconEllipsis";
import { MouseEvent, useEffect, useState } from "react";
import IconPlay from "components/Icons/IconPlay";
import { formatNumber } from "utils/number";
import { usePlayer } from "hooks/usePlayer";
import IconPause from "components/Icons/IconPause";
import LinkUnderline from "components/LinkUnderline/LinkUnderline";
import TrackLikeButton from "./TrackLikeButton/TrackLikeButton";
import { ETrackListLayoutType } from "./TrackList.types";

export interface ITrackItemProps {
  track: ITrack;
  date: string;
  index: number;
  layoutType: ETrackListLayoutType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isCompact?: boolean;
  onPlay: () => void;
  isColDateHidden: boolean,
  isColAlbumHidden: boolean,
  isColArtistHidden: boolean,
  isColPlaysHidden: boolean,
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

  const playbackActionIcon = (() => {
    if (track.id === trackId && isPlaying) {
      return (
        <div className={styles.iconContainer}>
          <IconPause />
          <img className={styles.eq} src={`${process.env.PUBLIC_URL}/svg/eq.svg`} alt="EQ"/>
        </div>
      )
    }

    return (
      <div className={styles.iconContainer}>
        <IconPlay />
      </div>
    );
  })()

  const elColNumber = layoutType !== "searchResults" ? (
    <div className={styles.colNumber}>
      <p className={styles.index}>{ index }</p>
      <div onClick={onPlayHandler} className={styles.playbackActions}>
        { playbackActionIcon }
      </div>
    </div>
  ): null;
  const elImage = track.album == null || isCompact ? null : (
    <div className={styles.imageContainer}>
      {
        layoutType === ETrackListLayoutType.searchResults ? (
          <div onClick={onPlayHandler}>
            { playbackActionIcon }
          </div>
        ) : null
      }
      <img src={track.album.images[0]?.url} alt={track.album.name} />
    </div>
  );
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

  const classIsSelected = isSelected ? styles.selected : null
  const classIsPlaying = isCurrentTrackPlaying ? styles.playing : null;
  const classIsPaused = isCurrentTrackPaused ? styles.paused : null;

  return (
    <div onClick={() => onSelect(track.id)} className={`${styles.trackItem} ${styles.gridItem} ${classIsSelected} ${classIsPlaying} ${classIsPaused}`}>
      { elColNumber }
      <div className={styles.colTitle}>
        { elImage }
        <div className={styles.trackInfo}>
          <LinkUnderline url={`/track/${track.id}`} className={styles.name}>{ track.name }</LinkUnderline>
          { elArtists }
        </div>
      </div>
      { elColArtist }
      { elColAlbum }
      { elColDateAdded }
      { elColPlays }
      <div className={styles.colDuration}>
        <TrackLikeButton trackId={track.id} />
        <p>{ duration }</p>
        <div className={styles.moreActions}>
          <IconEllipsis />
        </div>
      </div>
    </div>
  )
}

export default TrackItem;
