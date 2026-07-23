import styles from "./AppPlayer.module.scss"
import PlayerMidSection from "components/AppPlayer/PlayerMidSection/PlayerMidSection";
import PlayerLeftSection from "components/AppPlayer/PlayerLeftSection/PlayerLeftSection";
import PlayerRightSection from "components/AppPlayer/PlayerRightSection/PlayerRightSection";

function AppPlayer() {
  return (
    <div className={ styles.appPlayer }>
      <PlayerLeftSection />
      <PlayerMidSection />
      <PlayerRightSection />
    </div>
  )
}

export default AppPlayer;
