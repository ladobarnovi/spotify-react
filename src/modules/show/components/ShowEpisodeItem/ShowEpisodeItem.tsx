import styles from "./ShowEpisodeItem.module.scss"
import { IEpisode } from "types/podcast";
import EntityImage from "components/Common/EntityImage/EntityImage";
import { NavLink, useNavigate } from "react-router-dom";
import IconVideo from "components/Icons/IconVideo";
import moment from "moment";
import { getFormattedDuration } from "utils/duration";
import { useResize } from "hooks/useResize";
import { useEffect, useRef, useState } from "react";
import ContextPlayButton from "../../../../components/ContextPlayButton/ContextPlayButton";

interface IProps {
  episode: IEpisode;
}

export default function ShowEpisodeItem({ episode }: IProps) {
  const navigate = useNavigate();
  const refMain = useRef<HTMLDivElement>(null);
  const { addOnResize } = useResize();
  const [ isCompact, setIsCompact ] = useState(false);

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

  function onResize(): void {
    const el = refMain.current;
    if (el == null) return;

    setIsCompact(el.clientWidth < 600);
  }

  useEffect(() => {
    const destructor = addOnResize(onResize);
    return () => destructor();
  }, [ ]);

  const classCompact = isCompact ? styles.compact : null;

  return (
    <div ref={refMain} className={`${styles.showEpisodeItem} ${classCompact}`} onClick={onClickHandler}>
      <div className={styles.imageContainer}>
        <EntityImage entity={episode} isRounded={false} />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.topWrapper}>
          <div className={styles.imageContainer}>
            <EntityImage entity={episode} isRounded={false} />
          </div>
          <div>
            <NavLink className={styles.title} to={url}>{ episode.name }</NavLink>
            <div className={styles.type}>
              <div className={styles.iconContainer}>
                <IconVideo />
              </div>
              <p>Video</p>
            </div>
          </div>
        </div>
        <div className={styles.midWrapper}>
          <p>{ episode.description }</p>
        </div>
        <div className={styles.bottomWrapper}>
          <ContextPlayButton uri={episode.uri}/>
          { elExplicit }
          <p className={styles.date}>{ date } • { duration }</p>
        </div>
      </div>
    </div>
  )
}
