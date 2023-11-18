import styles from "./RelatedArtists.module.scss"
import { useEffect, useState } from "react";
import { IArtist } from "types/artist";
import { api } from "api";
import { useParams } from "react-router-dom";
import EntityCard from "components/EntityCard/EntityCard";

function RelatedArtists() {
  const [ arrRelatedArtists, setArrRelatedArtists ] = useState<IArtist[]>([]);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await api.artists.relatedArtists({ artistId: id as string });
      setArrRelatedArtists(response.artists);
    })()
  });

  const elCards = arrRelatedArtists.map((artist) => (
    <EntityCard data={artist} />
  ));

  return (
    <div className={ styles.relatedArtists }>
      <p className={styles.title}>Fans also like</p>

      <div className={styles.gridView}>
        { elCards }
      </div>
    </div>
  )
}

export default RelatedArtists;
