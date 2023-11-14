import { IEntityBase } from "types/entityBase";

export interface IArtist extends IEntityBase {
  genres: string[];
  followers: {
    total: number;
  };
}
