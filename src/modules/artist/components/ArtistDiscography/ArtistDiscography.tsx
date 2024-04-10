import styles from "./ArtistDiscography.module.scss";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import { EAlbumType, IAlbum } from "types/album";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "api";

interface IProps {
  artistId: string;
}

function ArtistDiscography({ artistId }: IProps) {
  const [ filterKey, setFilterKey ] = useState("popular");
  const [ arrFilteredAlbums, setArrFilteredAlbums ] = useState<IAlbum[]>([ ]);

  const { data: arrArtistAlbums } = useQuery<IAlbum[]>({
    queryKey: [ "artistDiscography", artistId ],
    cacheTime: 0,
    queryFn: async () => {
      const response = await api.artists.albums({ artistId });
      return response.items;
    },
  })

  useEffect(() => {
    const arrAlbums = arrArtistAlbums || [];

    if (filterKey === "popular") {
      setArrFilteredAlbums(arrAlbums);
    }
    else if (filterKey === "album") {
      setArrFilteredAlbums(arrAlbums.filter((album) => (
        album.album_type === EAlbumType.album
      )))
    }
    else if (filterKey === "ep") {
      setArrFilteredAlbums(arrAlbums.filter((album) => (
        album.album_type === EAlbumType.single || album.album_type === EAlbumType.ep
      )))
    }
  }, [ filterKey, arrArtistAlbums ]);

  if (arrArtistAlbums == null) return null;

  const arrFilters = [
    { title: "Popular releases", key: "popular" },
    { title: "Albums", key: "album" },
    { title: "Singles & EPs", key: "ep" }
  ];

  const elFilters = arrFilters.map((filter) => (
    <button
      key={filter.key}
      onClick={() => { setFilterKey(filter.key) }}
      className={filter.key === filterKey ? styles.active : ''}
    >{ filter.title }</button>
  ));

  return (
    <div className={styles.artistDiscography}>
      <CardsRow
        title={"Discography"}
        arrData={arrFilteredAlbums}
        url={`/artist/${artistId}/discography`}
      >
        <div className={styles.discographyFilters}>
          { elFilters }
        </div>
      </CardsRow>
    </div>
  );
}

export default ArtistDiscography;
