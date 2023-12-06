import { IImage } from "types/common";

export type TEntityType = "album" | "track" | "artist" | "playlist" | "user" | "show" | "episode";

export interface IEntityBase {
  id: string;
  href: string;
  name: string;
  owner: {
    id: string;
    display_name: string;
  };
  type: TEntityType;
  uri: string;
  external_urls: {
    spotify: string;
  };
  images: IImage[]
}
