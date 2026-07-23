import { IEntityBase } from "types/entityBase";
import { IImage } from "types/common";
import { ITrack, ITrackContainer } from "types/track";

export interface IPlaylist extends IEntityBase {
  description: string;
  images: IImage[];
  tracks: {
    href: string;
    total: number;
    items: ITrackContainer[];
  }
}
