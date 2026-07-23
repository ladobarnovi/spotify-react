import styles from "./PlayerRightSection.module.scss"
import VolumeSlider from "components/AppPlayer/PlayerRightSection/VolumeSlider/VolumeSlider";
import IconMiniPlayer from "components/Icons/IconMiniPlayer";
import IconExpand from "components/Icons/IconExpand";

function PlayerRightSection() {
  return (
    <div className={ styles.playerRightSection }>
      <VolumeSlider />
      <button>
        <IconMiniPlayer />
      </button>
      <button>
        <IconExpand />
      </button>
    </div>
  )
}

export default PlayerRightSection;
