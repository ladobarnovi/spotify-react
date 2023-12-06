import styles from "./ShowEpisodeItem.module.scss"
import { IEpisode } from "types/podcast";
import EntityImage from "components/Common/EntityImage/EntityImage";
import { NavLink, useNavigate } from "react-router-dom";
import IconVideo from "components/Icons/IconVideo";
import PlayButton from "components/PlayButton/PlayButton";
import moment from "moment";
import { getFormattedDuration } from "utils/duration";

interface IProps {
  episode: IEpisode;
}

function ShowEpisodeItem({ episode }: IProps) {
  const navigate = useNavigate();

  const url = `/episode/${episode.id}`
  const date = moment(episode.release_date).format("MMM DD");
  const duration = getFormattedDuration(episode.duration_ms);
  const elExplicit = !episode.explicit ? (
    <div className={`${styles.explicit} explicit`}>
      <span>E</span>
    </div>
  ): null;

  function onClickHandler(): void {
    navigate(url);
  }

  return (
    <div className={styles.showEpisodeItem} onClick={onClickHandler}>
      <div className={styles.imageContainer}>
        <EntityImage image={episode.images[0]} isRounded={false} />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.topWrapper}>
          <NavLink className={styles.title} to={url}>{ episode.name }</NavLink>
          <div className={styles.type}>
            <div className={styles.iconContainer}>
              <IconVideo />
            </div>
            <p>Video</p>
          </div>
        </div>
        <div className={styles.midWrapper}>
          <p>{ episode.description }</p>
        </div>
        <div className={styles.bottomWrapper}>
          <PlayButton />
          { elExplicit }
          <p className={styles.date}>{ date } • { duration }</p>
        </div>
      </div>
    </div>
  )
}

export default ShowEpisodeItem;
