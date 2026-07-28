import { ITrack, ITrackContainer } from "types/track";

export enum ETrackListLayoutType {
  album = "album",
  playlist = "playlist",
  topTracks = "topTracks",
  searchResults = "searchResults",
  discography = "discography",
}

export interface ITrackListProps {
  arrTrackContainer?: ITrackContainer[]|null; // Should be provided with this or `arrTracks` property
  arrTracks?: ITrack[]|null; // see comment above
  layoutType: ETrackListLayoutType;
  totalTracks?: number;
  canHeaderStick?: boolean; // default: true
  isCompact?: boolean;
  onPlay: (index: number) => void;
  maxColCount?: number;
}
