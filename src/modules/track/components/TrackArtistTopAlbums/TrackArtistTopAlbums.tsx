import styles from "./TrackArtistTopAlbums.module.scss"
import { IArtist } from "types/artist";
import { useEffect, useState } from "react";
import { api } from "api";
import { IAlbum } from "types/album";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";

interface IProps {
  arrArtists: IArtist[];
}

interface ITuple {
  artist: IArtist;
  arrAlbums: IAlbum[];
}

function TrackArtistTopAlbums({ arrArtists }: IProps) {
  const [ arrTuples, setArrTuple ] = useState<ITuple[]>([]);

  useEffect(() => {
    (async () => {
      const arrPromises = arrArtists.map(async (artist) => await api.artists.albums({ artistId: artist.id }))
      const arrResponses = await Promise.all(arrPromises);
      console.log(arrResponses);

      const arrTuples: ITuple[] = arrResponses.map((response, index) => ({
        artist: arrArtists[index],
        arrAlbums: response.items
      }));

      setArrTuple(arrTuples);
    })()
  }, [ arrArtists ]);

  const elPopularAlbums = arrTuples.map(({ artist, arrAlbums }) => {
    const title = `Popular albums by ${artist.name}`;
    const url = `/artist/${artist.id}/discography`
    return (
      <CardsRow
        key={artist.id}
        title={title}
        url={url}
        arrData={arrAlbums}
      />
    )
  })

  return (
    <div className={styles.trackArtistTopAlbums}>
      { elPopularAlbums }
    </div>
  )
}

export default TrackArtistTopAlbums;
