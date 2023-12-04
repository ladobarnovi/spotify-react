import styles from "./ContextPlayButton.module.scss"
import PlayButton from "components/PlayButton/PlayButton";
import { usePlayer } from "hooks/usePlayer";

interface IProps {
  uri: string;
}

function ContextPlayButton({ uri }: IProps) {
  const { contextUri, isPlaying, isPaused, togglePlay, playContext, getUriType, playTrack, trackId, getUriId } = usePlayer();

  const uriType = getUriType(uri);
  const uriId = getUriId(uri);

  const isCurrentUriOrTrack = contextUri === uri || uriId === trackId;
  const isContextPlaying = isCurrentUriOrTrack && isPlaying;
  const isContextPaused = isCurrentUriOrTrack && isPaused;

  async function onClickHandler(): Promise<void> {
    if (isContextPaused || isContextPlaying) {
      await togglePlay();
    }
    else {
      if (uriType === "track") {
        await playTrack([ uri ]);
      }
      else {
        await playContext(uri);
      }
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
