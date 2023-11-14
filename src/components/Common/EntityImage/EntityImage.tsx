import styles from "./EntityImage.module.scss";
import { IImage } from "types/common";
import IconNote from "components/Icons/IconNote";

interface IProps {
  image: IImage | undefined;
  isRounded: boolean;
}

function EntityImage({ image, isRounded = false }: IProps) {
  const imgNode = image == null ? <IconNote /> : <img src={ image?.url } />

  return (
    <div className={ `${styles.entityImage} ${isRounded ? styles.rounded : null}` }>
      { imgNode }
    </div>
  )
}

export default EntityImage;
