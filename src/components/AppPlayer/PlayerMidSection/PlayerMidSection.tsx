import styles from "./PlayerMidSection.module.scss"
import PlaybackControls from "components/AppPlayer/PlayerMidSection/PlaybackControls/PlaybackControls";
import PlaybackBar from "components/AppPlayer/PlayerMidSection/PlaybackBar/PlaybackBar";

function PlayerMidSection() {
  return (
    <div className={ styles.playerMidSection }>
      <PlaybackControls />
      <PlaybackBar />
    </div>
  )
}

export default PlayerMidSection;
