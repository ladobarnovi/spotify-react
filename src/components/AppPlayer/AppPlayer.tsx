import styles from "./AppPlayer.module.scss"
import { usePlayer } from "hooks/usePlayer";
import PlayerMidSection from "components/AppPlayer/PlayerMidSection/PlayerMidSection";

function AppPlayer() {
  const { playTrack } = usePlayer();

  return (
    <div className={ styles.appPlayer }>
      <PlayerMidSection />
    </div>
  )
}

export default AppPlayer;
