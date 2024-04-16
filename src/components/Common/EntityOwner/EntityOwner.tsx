import { IEntityBase } from "types/entityBase";
import { IAlbum } from "types/album";

interface IProps {
  entity: IEntityBase;
  hasSeparator?: boolean;
}
export default function EntityOwner({ entity, hasSeparator = true }: IProps) {
  let owner = null;
  if (entity.type === "album") {
    owner = (entity as IAlbum).artists[0].name;
  }
  else if (entity.type === "playlist") {
    owner = entity.owner.display_name;
  }
  else {
    return null;
  }

  const elSeparator = hasSeparator ? <span> • </span> : null;

  return <span>{ elSeparator }{ owner }</span>
}