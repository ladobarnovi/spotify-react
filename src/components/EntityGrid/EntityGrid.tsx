import styles from "./EntityGrid.module.scss"
import { IEntityBase } from "types/entityBase";
import EntityCard, { ICardOptions } from "../EntityCard/EntityCard";

interface IProps {
  arrEntities: IEntityBase[];
  options?: ICardOptions;
}
export default function EntityGrid({ arrEntities, options }: IProps) {
  return (
    <div className={styles.entityGrid}>
      {
        arrEntities.map((entity) => (
          <EntityCard data={entity} options={options} />
        ))
      }
    </div>
  )
}