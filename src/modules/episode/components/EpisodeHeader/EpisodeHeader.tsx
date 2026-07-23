import styles from "./EpisodeHeader.module.scss"
import { IEpisode } from "types/podcast";
import EntityHeaderWrapper from "components/EntityHeaderWrapper/EntityHeaderWrapper";
import { NavLink } from "react-router-dom";

interface IProps {
  episode: IEpisode;
}

function EpisodeHeader({ episode }: IProps) {
  const { show } = episode;
  const elShowName = show != null ? (
    <NavLink to={`/show/${show.id}`} className={styles.showName}>{ show.name }</NavLink>
  ): null;

  return (
    <EntityHeaderWrapper image={episode.images[0]} title={episode.name} type={episode.type}>
      { elShowName }
    </EntityHeaderWrapper>
  )
}

export default EpisodeHeader;
