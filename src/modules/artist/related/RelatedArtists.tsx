import styles from "./RelatedArtists.module.scss"
import { api } from "api";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import EntityGrid from "components/EntityGrid/EntityGrid";

function RelatedArtists() {
  const { id } = useParams();

  const { data: arrRelatedArtists } = useQuery({
    queryKey: [ "fetchRelatedArtists", id ],
    queryFn: async () => (await api.artists.relatedArtists({ artistId: id as string })).artists
  })

  return arrRelatedArtists ? (
    <div className={styles.relatedArtists}>
      <p className={styles.title}>Fans also like</p>
      <EntityGrid arrEntities={arrRelatedArtists} />
    </div>
  ) : null;
}

export default RelatedArtists;
