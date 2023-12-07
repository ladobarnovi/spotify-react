import { IEntityBase } from "types/entityBase";

export interface IPodcast extends IEntityBase {
  publisher: string;
  description: string;
}

export interface IEpisode extends IEntityBase {
  release_date: string;
  duration_ms: number;
  description: string;
  html_description: string;
  explicit: boolean;
  show: IPodcast;
}
