import styles from "./TopTracks.module.scss";
import { ITrackContainer } from "types/track";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import { useEffect, useState } from "react";
import { usePlayer } from "hooks/usePlayer";
import { useQuery } from "react-query";
import { api } from "../../../../api";

interface IProps {
  artistId: string;
  onTracksFetched: (arrUris: string[]) => void
}

function TopTracks({ artistId, onTracksFetched }: IProps) {
  const [ isExpanded, setIsExpanded ] = useState(false);
  const { playTrack } = usePlayer();

  const { data: arrTracks } = useQuery({
    queryKey: [ "artistTopTracks", artistId ],
    queryFn: async () => (await api.artists.GetArtistTopTracks({ artistId })).tracks
  });

  useEffect(() => {
    if (arrTracks != null) {
      onTracksFetched(arrTracks.map((track => track.uri)));
    }
  }, [ arrTracks ]);

  if (arrTracks == null) return null;

  const arrTrackContainers: ITrackContainer[] = arrTracks
    .slice(0, isExpanded ? 10 : 5)
    .map((track) => ({
      added_at: "",
      track,
    }));

  const elToggleExpandButton = (() => (
    <p onClick={() => { setIsExpanded(!isExpanded) }} className={styles.toggleExpand}>{ isExpanded ? "Show less" : "See more" }</p>
  ))();

  async function onPlay(index: number): Promise<void> {
    const arrUris = arrTracks!.map((track) => track.uri);
    await playTrack(arrUris, index);
  }

  return (
    <div className={styles.topTracks}>
      <p className={styles.title}>Popular</p>
      <TrackList
        arrTrackContainer={arrTrackContainers}
        layoutType={ETrackListLayoutType.topTracks}
        onPlay={onPlay}
        maxColCount={4}
      />

      { elToggleExpandButton }
    </div>
  );
}

export default TopTracks;
