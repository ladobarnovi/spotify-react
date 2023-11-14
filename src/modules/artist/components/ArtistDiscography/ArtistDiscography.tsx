import styles from "./ArtistDiscography.module.scss";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import { EAlbumType, IAlbum } from "types/album";
import { useState } from "react";

interface IProps {
  arrAlbums: IAlbum[];
  artistId: string;
}

function ArtistDiscography({ arrAlbums, artistId }: IProps) {
  const [ filterKey, setFilterKey ] = useState("popular");
  const [ arrFilteredAlbums, setArrFilteredAlbums ] = useState<IAlbum[]>(arrAlbums);

  function filterAlbums(key: string) {
    setFilterKey(key);

    if (key === "popular") {
      setArrFilteredAlbums(arrAlbums);
    }
    else if (key === "album") {
      setArrFilteredAlbums(arrAlbums.filter((album) => (
        album.album_type === EAlbumType.album
      )))
    }
    else if (key === "ep") {
      setArrFilteredAlbums(arrAlbums.filter((album) => (
        album.album_type === EAlbumType.single || album.album_type === EAlbumType.ep
      )))
    }
  }

  const arrFilters = [
    { title: "Popular releases", key: "popular" },
    { title: "Albums", key: "album" },
    { title: "Singles & EPs", key: "ep" }
  ];

  const elFilters = arrFilters.map((filter) => (
    <button
      key={filter.key}
      onClick={() => {filterAlbums(filter.key)}}
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
