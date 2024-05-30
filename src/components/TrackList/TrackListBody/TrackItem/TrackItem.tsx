import styles from "./TrackItem.module.scss";
import TrackListGridWrapper from "../../TrackListGridWrapper/TrackListGridWrapper";
import { ITrack } from "types/track";
import IconPause from "../../../Icons/IconPause";
import IconPlay from "../../../Icons/IconPlay";
import { usePlayer } from "../../../../hooks/usePlayer";
import { MouseEvent } from "react";

interface IProps {
  index: number;
  track: ITrack;
  date: string;
}
export default function TrackItem({ track, date, index }: IProps) {
  return (
    <TrackListGridWrapper className={styles.trackItem}>
      <ColNumber track={track} index={index} />
    </TrackListGridWrapper>
  )
}

interface IColNumberProps {
  index: number;
  track: ITrack;
}
function ColNumber({ track, index }: IColNumberProps) {
  const { trackId, isPlaying, isPaused, togglePlay } = usePlayer();

  const isCurrentTrackPlaying = isPlaying && track.id === trackId;
  const isCurrentTrackPaused = isPaused && track.id === trackId;

  function onPlayHandler(e: MouseEvent<HTMLDivElement>): void {
    e.stopPropagation();

    if (isCurrentTrackPlaying || isCurrentTrackPaused) {
      togglePlay();
    }
    else {
      // todo
      // onPlay();
    }
  }

  const playbackActionIcon = (() => {
    if (track.id === trackId && isPlaying) {
      return (
        <div className={styles.iconContainer}>
          <IconPause />
          <img className={styles.eq} src="/svg/eq.svg" alt="EQ"/>
        </div>
      )
    }

    return (
      <div className={styles.iconContainer}>
        <IconPlay />
      </div>
    );
  })()

  return (
    <div className={styles.colNumber}>
      <p className={styles.index}>{index}</p>
      <div onClick={onPlayHandler} className={styles.playbackActions}>
        {playbackActionIcon}
      </div>
    </div>
  )
}