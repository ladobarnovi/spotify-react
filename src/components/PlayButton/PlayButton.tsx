import styles from "./PlayButton.module.scss"
import IconPlay from "components/Icons/IconPlay";

function PlayButton() {
  return (
    <div className={styles.playButton}>
      <IconPlay />
    </div>
  );
}

export default PlayButton;
