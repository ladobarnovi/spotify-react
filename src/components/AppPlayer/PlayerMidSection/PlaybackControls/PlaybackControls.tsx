import styles from "./PlaybackControls.module.scss"
import PlayButton from "components/PlayButton/PlayButton";
import IconPrev from "components/Icons/IconPrev";
import IconShuffle from "components/Icons/IconShuffle";
import IconNext from "components/Icons/IconNext";
import IconRepeat from "components/Icons/IconRepeat";
import { ESpotifyRepeatMode, usePlayer } from "hooks/usePlayer";

function PlaybackControls() {
  const { playNext, playPrevious, isShuffle, repeatMode, toggleShuffle, toggleRepeat, isPlaying, togglePlay } = usePlayer();

  const isRepeatActive = repeatMode === ESpotifyRepeatMode.ONCE_REPEAT || repeatMode === ESpotifyRepeatMode.FULL_REPEAT;

  return (
    <div className={ styles.playbackControls }>
      <button className={`${styles.buttonShuffle} ${isShuffle ? styles.active : null}`} onClick={toggleShuffle} >
        <IconShuffle />
      </button>
      <button className={styles.buttonPrev} onClick={playPrevious}>
        <IconPrev />
      </button>

      <div className={styles.play}>
        <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
      </div>

      <button className={styles.buttonNext} onClick={playNext}>
        <IconNext />
      </button>
      <button className={`${styles.buttonRepeat} ${isRepeatActive ? styles.active : null}`} onClick={toggleRepeat} >
        <IconRepeat />
      </button>
    </div>
  )
}

export default PlaybackControls;
