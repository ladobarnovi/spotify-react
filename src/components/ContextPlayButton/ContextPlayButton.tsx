import styles from "./ContextPlayButton.module.scss"
import PlayButton from "components/PlayButton/PlayButton";
import { usePlayer } from "hooks/usePlayer";
import { api } from "../../api";
import { useEffect, useState } from "react";

interface IProps {
  uri: string;
  onPlayStateChanged?: (isPlaying: boolean) => void;
}

function ContextPlayButton({ uri, onPlayStateChanged }: IProps) {
  const [ isCurrentInstancePlaying, setIsCurrentInstancePlaying ] = useState(false);
  const [ isContextPlaying, setIsContextPlaying ] = useState(false);
  const [ isContextPaused, setIsContextPaused ] = useState(false);

  const {
    contextUri,
    deviceId,
    isPlaying,
    isPaused,
    togglePlay,
    trackArtists,
    trackAlbum,
    playContext,
    getUriType,
    playTrack,
    trackId,
    getUriId
  } = usePlayer();

  const uriType = getUriType(uri);
  const uriId = getUriId(uri);

  useEffect(() => {
    const newState = contextUri === uri || uriId === trackId || trackAlbum?.uri === uri || !!trackArtists?.some(artist => artist.uri === uri);
    setIsCurrentInstancePlaying(newState);
  }, [ uri, contextUri, trackAlbum, trackArtists ]);

  useEffect(() => {
    setIsContextPlaying(isCurrentInstancePlaying && isPlaying);
    setIsContextPaused(isCurrentInstancePlaying && isPaused);

    if (onPlayStateChanged) {
      onPlayStateChanged(isCurrentInstancePlaying);
    }
  }, [ isCurrentInstancePlaying, isPlaying, isPaused ]);

  async function onClickHandler(): Promise<void> {
    if (isContextPaused || isContextPlaying) {
      await togglePlay();
    }
    else {
      if (uriType === "track" || uriType === "episode") {
        await playTrack([ uri ]);
      }
      else if (uriType === "artist") {
        const { tracks } = await api.artists.GetArtistTopTracks({ artistId: uriId });
        await api.player.play({
          deviceId,
          data: {
            uris: tracks.map(track => track.uri),
            offset: {
              position: 0,
            },
          },
        });
      }
      else {
        await playContext(uri);
      }
    }
  }

  return (
    <div className={styles.contextPlayButton}>
      <PlayButton
        onClick={onClickHandler}
        isPlaying={isContextPlaying}
      />
    </div>
  )
}

export default ContextPlayButton;
