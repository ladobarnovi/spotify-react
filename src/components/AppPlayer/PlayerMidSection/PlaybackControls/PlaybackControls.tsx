import styles from "./PlaybackControls.module.scss"
import PlayButton from "components/PlayButton/PlayButton";
import IconPrev from "components/Icons/IconPrev";
import IconShuffle from "components/Icons/IconShuffle";
import IconNext from "components/Icons/IconNext";
import IconRepeat from "components/Icons/IconRepeat";
import { usePlayer } from "hooks/usePlayer";

function PlaybackControls() {
  const { playNext, playPrevious } = usePlayer();

  return (
    <div className={ styles.playbackControls }>
      <button className={styles.buttonShuffle}>
        <IconShuffle />
      </button>
      <button className={styles.buttonPrev} onClick={playPrevious}>
        <IconPrev />
      </button>

      <div className={styles.play}>
        <PlayButton onPlay={() => {}} />
      </div>

      <button className={styles.buttonNext} onClick={playNext}>
        <IconNext />
      </button>
      <button className={styles.buttonRepeat}>
        <IconRepeat />
      </button>
    </div>
  )
}

export default PlaybackControls;
