import styles from "./SearchKeyword.module.scss"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "api";
import { IAlbum } from "types/album";
import { ITrack } from "types/track";
import { IArtist } from "types/artist";
import { IPlaylist } from "types/playlist";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import SearchResultCard from "modules/search/components/SearchResultCard/SearchResultCard";
import SearchResultTracks from "modules/search/components/SearchResultTracks/SearchResultTracks";

function SearchKeyword() {
  const [ arrAlbums, setArrAlbums ] = useState<IAlbum[]>([ ]);
  const [ arrTracks, setArrTracks ] = useState<ITrack[]>([]);
  const [ arrArtists, setArrArtists ] = useState<IArtist[]>([]);
  const [ arrPlaylists, setArrPlaylists ] = useState<IPlaylist[]>([]);

  const [ timeoutId, setTimeoutId ] = useState<NodeJS.Timeout>();
  const [ isLoading, setIsLoading ] = useState(true);

  const { keyword } = useParams();

  async function search(): Promise<void> {
    try {
      setIsLoading(true);
      const { albums, artists, tracks, playlists } = await api.search.search({
        q: keyword as string
      });

      setArrAlbums(albums.items);
      setArrArtists(artists.items);
      setArrPlaylists(playlists.items);
      setArrTracks(tracks.items.slice(0, 4));
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(async () => {
      await search()
    }, 100));

    return () => clearTimeout(timeoutId);
  }, [ keyword ]);

  if (isLoading) return null;

  return (
    <div className={ styles.searchKeyword }>
      <div className={styles.topGridContainer}>
        <div className={styles.topResultContainer}>
          <SearchResultCard data={arrTracks[0]} />
        </div>
        <div className={styles.tracksContainer}>
          <SearchResultTracks arrTracks={arrTracks} />
        </div>
      </div>

      <CardsRow title={"Artists"} arrData={arrArtists} />
      <CardsRow title={"Playlists"} arrData={arrPlaylists} />
      <CardsRow title={"Albums"} arrData={arrAlbums} />
    </div>
  )
}

export default SearchKeyword;
