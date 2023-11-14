import { ITrack } from "types/track";
import { IEntityBase } from "types/entityBase";
import { IArtist } from "types/artist";

export enum EAlbumType {
  album = "album",
  single = "single",
  ep = "ep",
}

export interface ICopyright {
  text: string;
  type: string;
}

export interface IAlbum extends IEntityBase{
  album_type: EAlbumType;
  artists: IArtist[];
  copyrights: ICopyright[];
  genres: string[];
  release_date: string;
  total_tracks: number;
  tracks: {
    href: string;
    items: ITrack[];
  };
}
