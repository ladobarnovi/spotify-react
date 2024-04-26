import styles from "./ShowEpisodeList.module.scss"
import { useEffect, useState } from "react";
import { IEpisode } from "types/podcast";
import { api } from "api";
import ShowEpisodeItem from "modules/show/components/ShowEpisodeItem/ShowEpisodeItem";

interface IProps {
  showId: string;
}

function ShowEpisodeList({ showId }: IProps) {
  const [ arrEpisodes, setArrEpisodes ] = useState<IEpisode[]>([]);

  useEffect(() => {
    if (showId == null) return;

    (async () => {
      const response = await api.shows.GetShowEpisodes({ showId });

      setArrEpisodes(response.items);
    })()
  }, [ showId ]);

  const elEpisodes = arrEpisodes.map((episode) => (
    <ShowEpisodeItem episode={episode} />
  ));

  return (
    <div className={ styles.showEpisodeList }>
      { elEpisodes }
    </div>
  )
}

export default ShowEpisodeList;
