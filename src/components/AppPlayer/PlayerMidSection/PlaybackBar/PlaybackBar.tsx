import styles from "./PlaybackBar.module.scss"
import RangeSlider from "components/RangeSlider/RangeSlider";

function PlaybackBar() {
  return (
    <div className={ styles.playbackBar }>
      <p className={styles.playbackPosition}>0:00</p>
      <div className={styles.sliderContainer}>
        <RangeSlider
          onPositionUpdated={() => {}}
          onSlideEnded={() => {}}
          onSlideStarted={() => {}}
          minValue={0}
          maxValue={100}
        />
      </div>
      <p className={styles.playbackDuration}>4:00</p>
    </div>
  )
}

export default PlaybackBar;
