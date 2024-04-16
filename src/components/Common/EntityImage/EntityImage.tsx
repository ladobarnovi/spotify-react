import styles from "./EntityImage.module.scss";
import { IEntityBase } from "types/entityBase";
import IconNote from "components/Icons/IconNote";

interface IProps {
  entity: IEntityBase;
  isRounded: boolean;
}

function EntityImage({ entity, isRounded = false }: IProps) {
  const image = entity.images ? entity.images[0] : undefined;

  const imgNode = image == null ? <IconNote /> : <img src={ image?.url } />

  return (
    <div className={ `${styles.entityImage} ${isRounded ? styles.rounded : null}` }>
      { imgNode }
    </div>
  )
}

export default EntityImage;
