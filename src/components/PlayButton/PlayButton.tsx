import styles from "./PlayButton.module.scss"
import IconPlay from "components/Icons/IconPlay";
import IconPause from "components/Icons/IconPause";
import { MouseEvent } from "react";

interface IProps {
  onClick?: () => void;
  isPlaying?: boolean;
}

function PlayButton({ onClick, isPlaying }: IProps) {
  async function onClickHandler(event: MouseEvent): Promise<void> {
    event.preventDefault();

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
