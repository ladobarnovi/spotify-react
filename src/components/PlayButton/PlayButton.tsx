import styles from "./PlayButton.module.scss"
import IconPlay from "components/Icons/IconPlay";
import { usePlayer } from "hooks/usePlayer";
import IconPause from "components/Icons/IconPause";

interface IProps {
  onPause?: () => void;
  onClick?: () => void;
  isPlaying?: boolean;
}

function PlayButton({ onClick, isPlaying }: IProps) {
  async function onClickHandler(): Promise<void> {
    if (onClick) {
      onClick();
      return;
    }
  }

  const elIcon = isPlaying ? <IconPause /> : <IconPlay />;

  return (
    <div className={styles.playButton} onClick={onClickHandler}>
      { elIcon }
    </div>
  );
}

export default PlayButton;
