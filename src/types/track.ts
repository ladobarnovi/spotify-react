import { IEntityBase } from "types/entityBase";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";

export interface ITrackContainer {
  added_at: string;
  track: ITrack;
}

export interface ITrack extends IEntityBase{
  album: IAlbum;
  artists: IArtist[];
  duration_ms: number;
  explicit: boolean;
  release_date: string;
  copyrights: {
    text: string;
    type: string;
  }[]
}
