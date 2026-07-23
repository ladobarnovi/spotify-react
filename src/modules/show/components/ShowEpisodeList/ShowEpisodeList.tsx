import styles from "./ShowEpisodeList.module.scss"
import { api } from "api";
import ShowEpisodeItem from "modules/show/components/ShowEpisodeItem/ShowEpisodeItem";
import { useQuery } from "react-query";

interface IProps {
  showId: string;
}

export default function ShowEpisodeList({ showId }: IProps) {
  const { data } = useQuery({
    queryKey: [ "fetchShowEpisodes", showId ],
    queryFn: async () => await api.shows.GetShowEpisodes ({ showId })
  });

  if (data == null) return <></>;

  return (
    <div className={ styles.showEpisodeList }>
      {
        data.items.map((episode) => (
          <ShowEpisodeItem key={episode.id} episode={episode} />
        ))
      }
    </div>
  )
}
