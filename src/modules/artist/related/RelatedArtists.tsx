import styles from "./RelatedArtists.module.scss"
import { api } from "api";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import EntityCard from "components/EntityCard/EntityCard";

function RelatedArtists() {
  const { id } = useParams();

  const { data: arrRelatedArtists } = useQuery({
    queryKey: [ "fetchRelatedArtists", id ],
    queryFn: async () => (await api.artists.relatedArtists({ artistId: id as string })).artists
  })

  if (arrRelatedArtists == null) return null;

  return (
    <div className={ styles.relatedArtists }>
      <p className={styles.title}>Fans also like</p>

      <div className={styles.gridView}>
        {
          arrRelatedArtists.map((artist) => (
            <EntityCard data={artist} />
          ))
        }
      </div>
    </div>
  )
}

export default RelatedArtists;
