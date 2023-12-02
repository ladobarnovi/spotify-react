import styles from "./ContextPlayButton.module.scss"
import PlayButton from "components/PlayButton/PlayButton";
import { usePlayer } from "hooks/usePlayer";

interface IProps {
  uri: string;
}

function ContextPlayButton({ uri }: IProps) {
  const { contextUri, isPlaying, isPaused, togglePlay, playContext } = usePlayer();

  const isCurrentUri = contextUri === uri;
  const isContextPlaying = isCurrentUri && isPlaying;
  const isContextPaused = isCurrentUri && isPaused;

  async function onClickHandler(): Promise<void> {
    if (isContextPaused || isContextPlaying) {
      await togglePlay();
    }
    else {
      await playContext(uri);
    }
  }

  return (
    <div className={ styles.contextPlayButton }>
      <PlayButton
        onClick={onClickHandler}
        isPlaying={isContextPlaying}
      />
    </div>
  )
}

export default ContextPlayButton;
