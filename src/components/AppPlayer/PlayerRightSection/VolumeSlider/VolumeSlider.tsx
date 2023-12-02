import styles from "./VolumeSlider.module.scss"
import IconVolume from "components/Icons/IconVolume";
import { usePlayer } from "hooks/usePlayer";
import RangeSlider from "components/RangeSlider/RangeSlider";
import IconVolumeOff from "components/Icons/IconVolumeOff";

function VolumeSlider() {
  const { volume, setVolume } = usePlayer();

  const elIcon = volume === 0 ? <IconVolumeOff /> : <IconVolume />

  async function toggleVolume(): Promise<void> {
    await setVolume(volume <= 0 ? 1 : 0);
  }

  return (
    <div className={styles.volumeSlider}>
      <button onClick={toggleVolume}>
        { elIcon }
      </button>
      <div className={styles.sliderContainer}>
        <RangeSlider
          onSlideStarted={() => {}}
          onSlideEnded={() => {}}
          onPositionUpdated={setVolume}
          minValue={0}
          maxValue={1}
          value={volume}
        />
      </div>
    </div>
  )
}

export default VolumeSlider;
