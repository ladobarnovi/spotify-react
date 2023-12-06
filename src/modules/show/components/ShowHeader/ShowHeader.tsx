import styles from "./ShowHeader.module.scss"
import { IPodcast } from "types/podcast";
import EntityHeaderWrapper from "components/EntityHeaderWrapper/EntityHeaderWrapper";

interface IProps {
  show: IPodcast
}

function ShowHeader({ show }: IProps) {
  return (
    <EntityHeaderWrapper image={show.images[0]} title={show.name} type={show.type} >
      <p className={styles.publisher}>{ show.publisher }</p>
    </EntityHeaderWrapper>
  )
}

export default ShowHeader;
