import styles from "./TrackRecommendations.module.scss"
import { useEffect, useState } from "react";
import { api } from "api";
import { ITrack } from "types/track";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import { usePlayer } from "hooks/usePlayer";

interface IProps {
  trackId: string;
}

function TrackRecommendations({ trackId }: IProps) {
  const [ arrTracks, setArrTracks ] = useState<ITrack[]>([])

  const { playTrack } = usePlayer();

  useEffect(() => {
    (async () => {
      const response = await api.tracks.GetRecommendations({ trackIds: [ trackId ] })
      setArrTracks(response.tracks.splice(0, 5))
    })()
  }, [ trackId ]);

  async function onPlay(index: number): Promise<void> {
    const arrUris = arrTracks.map((track) => track.uri);
    await playTrack(arrUris, index);
  }

  return (
    <div className={styles.trackRecommendations}>
      <p className={styles.title}>Recommended</p>
      <p className={styles.subtitle}>Based on this song</p>

      <TrackList
        arrTracks={arrTracks}
        layoutType={ETrackListLayoutType.searchResults}
        onPlay={onPlay}
        maxColCount={2}
        totalTracks={5}
      />
    </div>
  )
}

export default TrackRecommendations;
