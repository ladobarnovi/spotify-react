import styles from "./TrackArtistTopTracks.module.scss"
import { IArtist } from "types/artist";
import { useEffect, useState } from "react";
import { ITrack } from "types/track";
import { api } from "api";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import { usePlayer } from "hooks/usePlayer";

interface IProps {
  artist: IArtist;
}

function TrackArtistTopTracks({ artist }: IProps) {
  const [ arrTracks, setArrTracks ] = useState<ITrack[]>([ ]);

  const { playTrack } = usePlayer();

  const { name } = artist;

  useEffect(() => {
    (async () => {
      const response = await api.artists.GetArtistTopTracks({ artistId: artist.id });

      setArrTracks(response.tracks.splice(0, 5));
    })();
  }, [ artist ]);

  async function onPlay(index: number): Promise<void> {
    const arrUris = arrTracks.map((track) => track.uri);
    await playTrack(arrUris, index);
  }

  return (
    <div className={styles.trackArtistTopTracks}>
      <p className={styles.subtitle}>Popular Tracks by</p>
      <p className={styles.title}>{ name }</p>

      <TrackList
        arrTracks={arrTracks}
        layoutType={ETrackListLayoutType.topTracks}
        onPlay={onPlay}
      />
    </div>
  )
}

export default TrackArtistTopTracks;
