import styles from "./PlayButton.module.scss"
import IconPlay from "components/Icons/IconPlay";
import { usePlayer } from "hooks/usePlayer";

interface IProps {
  onPlay: () => void;
  onPause?: () => void;
}

function PlayButton({ onPlay, onPause }: IProps) {
  const { isPlaying, pausePlayer } = usePlayer();

  async function onClickHandler(): Promise<void> {
    if (isPlaying) {
      await pausePlayer();
      if (onPause != null) {
        onPause();
      }
    }
    else {
      onPlay();
    }
  }

  return (
    <div className={styles.playButton} onClick={onClickHandler}>
      <IconPlay />
    </div>
  );
}

export default PlayButton;
