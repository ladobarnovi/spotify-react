import styles from "./AppPlayer.module.scss"
import { usePlayer } from "hooks/usePlayer";
import PlayerMidSection from "components/AppPlayer/PlayerMidSection/PlayerMidSection";
import PlayerLeftSection from "components/AppPlayer/PlayerLeftSection/PlayerLeftSection";

function AppPlayer() {
  const { playTrack } = usePlayer();

  return (
    <div className={ styles.appPlayer }>
      <PlayerLeftSection />
      <PlayerMidSection />
    </div>
  )
}

export default AppPlayer;
