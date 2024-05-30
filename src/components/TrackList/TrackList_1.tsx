import styles from "./TrackList_1.module.scss";
import { TrackListProvider } from "./TrackListContext";
import { ITrack, ITrackContainer } from "../../types/track";
import TrackListHeader from "./TrackListHeader/TrackListHeader";
import TrackListBody from "./TrackListBody/TrackListBody";

export enum ETrackListLayoutType {
  album = "album",
  playlist = "playlist",
  topTracks = "topTracks",
  searchResults = "searchResults",
}

interface IProps {
  arrTrackContainer?: ITrackContainer[]|null; // Should be provided with this or `arrTracks` property
  arrTracks?: ITrack[]|null; // see comment above
  layoutType: ETrackListLayoutType;
  totalTracks?: number;
  canHeaderStick?: boolean; // default: true
  isCompact?: boolean;
  onPlay: (index: number) => void;
  maxColCount?: number;
}
export default function TrackList_1 ({ arrTracks, onPlay, arrTrackContainer, isCompact, totalTracks, maxColCount = 6, canHeaderStick, layoutType }: IProps) {
  if (arrTrackContainer == null) {
    if (arrTracks != null) {
      arrTrackContainer = arrTracks.map((track) => ({
        added_at: "",
        track
      }));
    }
  }

  return (
    <TrackListProvider
      layoutType={layoutType}
      isCompact={isCompact || false}
      maxColCount={maxColCount}
    >
      <>
        <TrackListHeader canHeaderStick={true} />
        <TrackListBody arrTrackContainers={arrTrackContainer || []} />
      </>
    </TrackListProvider>
  )
}