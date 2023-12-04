import styles from "./SearchResultTracks.module.scss"
import { ITrack, ITrackContainer } from "types/track";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import { usePlayer } from "hooks/usePlayer";

interface IProps {
  arrTracks: ITrack[];
}

function SearchResultTracks({ arrTracks }: IProps) {
  const { playTrack } = usePlayer();

  const arrTrackContainer: ITrackContainer[] = arrTracks.map((track) => ({
    added_at: "",
    track,
  }));

  async function onPlayTrack(index: number): Promise<void> {
    await playTrack([ arrTracks[index].uri ]);
  }

  return (
    <div className={ styles.searchResultTracks }>
      <p className={styles.title}>
        Songs
      </p>

      <TrackList
        arrTrackContainer={arrTrackContainer}
        layoutType={ETrackListLayoutType.searchResults}
        onPlay={onPlayTrack}
        maxColCount={2}
      />
    </div>
  )
}

export default SearchResultTracks;
