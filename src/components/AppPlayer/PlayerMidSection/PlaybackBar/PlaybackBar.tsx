import styles from "./PlaybackBar.module.scss"
import RangeSlider from "components/RangeSlider/RangeSlider";
import { usePlayer } from "hooks/usePlayer";
import { useState } from "react";

function PlaybackBar() {
  const [ isSeeking, setIsSeeking ] = useState(false);
  const [ seekPosition, setSeekPosition ] = useState(0);

  const { trackDuration, trackPosition, seek } = usePlayer();

  function millisecondToTimer(milliseconds: number | null): string {
    if (milliseconds === null) return "";

    const totalSeconds = Math.floor(milliseconds / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = ((totalSeconds % 60) + "").padStart(2, "0");

    return minutes + ":" + seconds;
  }

  async function onSlideEnded(): Promise<void> {
    await seek(seekPosition);
    setIsSeeking(false);
  }

  async function onSlideStarted(): Promise<void> {
    setIsSeeking(true);
  }

  const formattedTrackPosition = millisecondToTimer(isSeeking ? seekPosition : trackPosition);
  const formattedTrackDuration = millisecondToTimer(trackDuration);

  return (
    <div className={ styles.playbackBar }>
      <p className={styles.playbackPosition}>
        { formattedTrackPosition }
      </p>
      <div className={styles.sliderContainer}>
        <RangeSlider
          onPositionUpdated={setSeekPosition}
          onSlideEnded={onSlideEnded}
          onSlideStarted={onSlideStarted}
          minValue={0}
          maxValue={trackDuration || 0}
        />
      </div>
      <p className={styles.playbackDuration}>
        { formattedTrackDuration }
      </p>
    </div>
  )
}

export default PlaybackBar;
