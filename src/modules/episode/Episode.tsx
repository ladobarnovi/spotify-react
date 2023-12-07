import styles from "./Episode.module.scss"
import { useEffect, useState } from "react";
import { IEpisode } from "types/podcast";
import { NavLink, useParams } from "react-router-dom";
import { api } from "api";
import EpisodeHeader from "modules/episode/components/EpisodeHeader/EpisodeHeader";
import { getFormattedDuration } from "utils/duration";
import moment from "moment";
import PlayButton from "components/PlayButton/PlayButton";

function Episode() {
  const [ episode, setEpisode ] = useState<IEpisode>();
  const { id } = useParams();


  useEffect(() => {
    (async () => {
      const response = await api.episodes.getEpisode({ episodeId: id as string });

      setEpisode(response);
    })()
  }, [ id ])

  if (episode == null) return null;

  const date = moment(episode.release_date).format("MMM DD");
  const duration = getFormattedDuration(episode.duration_ms);
  const show = episode.show;

  return (
    <div className={styles.episode}>
      <EpisodeHeader episode={episode} />

      <div className={styles.episodeBody}>
        <p className={styles.date}>{ date } • { duration }</p>

        <div className={styles.episodeActions}>
          <PlayButton />
        </div>

        <div className={styles.description}>
          <p className={styles.title}>Episode description</p>
          <div className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: episode.html_description }}/>
        </div>

        <NavLink className={styles.seeAll} to={`/show/${show.id}`}>See all episodes</NavLink>
      </div>
    </div>
  )
}

export default Episode;
