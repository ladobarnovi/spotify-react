import { IImage } from "types/common";
import { TEntityType } from "types/entityBase";

export interface IUser {
  display_name: string;
  email: string;
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: IImage[];
  type: TEntityType;
}
