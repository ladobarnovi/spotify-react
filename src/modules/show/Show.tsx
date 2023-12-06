import styles from "./Show.module.scss"
import ShowHeader from "modules/show/components/ShowHeader/ShowHeader";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { api } from "api";
import { IPodcast } from "types/podcast";
import ShowEpisodeList from "modules/show/components/ShowEpisodeList/ShowEpisodeList";
import { useResize } from "hooks/useResize";

function Show() {
  const [ show, setShow ] = useState<IPodcast>();
  const [ isVertical, setIsVertical ] = useState(false);

  const { addOnResize } = useResize();
  const { id } = useParams();
  const refGrid = useRef<HTMLDivElement>(null)

  function resize(): void {
    const el = refGrid.current;
    if (el == null) return;

    setIsVertical(el.clientWidth < 1020);
  }

  useEffect(() => {
    (async () => {
      const response = await api.shows.getShow({ showId: id as string });

      setShow(response);
    })();
  }, [ id ]);

  useEffect(() => {
    addOnResize(resize);
  }, [ ]);

  if (show == null) return null;

  const classVertical = isVertical ? styles.vertical : null;

  return (
    <div className={ styles.show }>
      <ShowHeader show={show} />

      <div ref={refGrid} className={`${styles.showBody} ${classVertical}`}>
        <ShowEpisodeList showId={show.id} />
        <div className={styles.about}>
          <p className={styles.title}>About</p>
          <p className={styles.description}>{ show.description }</p>
        </div>
      </div>
    </div>
  )
}

export default Show;
