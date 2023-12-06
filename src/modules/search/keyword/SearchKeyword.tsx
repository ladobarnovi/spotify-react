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
import ResponsiveGridWrapper from "components/ResponsiveGridWrapper/ResponsiveGridWrapper";
import { useSearchHistory } from "hooks/useSearchHistory";
import { IEpisode, IPodcast } from "types/podcast";

function SearchKeyword() {
  const [ arrAlbums, setArrAlbums ] = useState<IAlbum[]>([ ]);
  const [ arrTracks, setArrTracks ] = useState<ITrack[]>([]);
  const [ arrArtists, setArrArtists ] = useState<IArtist[]>([]);
  const [ arrPlaylists, setArrPlaylists ] = useState<IPlaylist[]>([]);
  const [ arrShows, setArrShows ] = useState<IPodcast[]>([]);
  const [ arrEpisodes, setArrEpisodes ] = useState<IEpisode[]>([]);
  const [ colCount, setColCount ] = useState(9);
  const [ isWrapperd, setIsWrapper ] = useState(false);

  const [ timeoutId, setTimeoutId ] = useState<NodeJS.Timeout>();
  const [ isLoading, setIsLoading ] = useState(true);

  const { addHistoryItem } = useSearchHistory();
  const { keyword } = useParams();

  async function search(): Promise<void> {
    try {
      setIsLoading(true);
      const { albums, artists, tracks, playlists, episodes, shows } = await api.search.search({
        q: keyword as string
      });

      setArrAlbums(albums.items);
      setArrArtists(artists.items);
      setArrPlaylists(playlists.items);
      setArrTracks(tracks.items.slice(0, 4));
      setArrShows(shows.items);
      setArrEpisodes(episodes.items);
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

  useEffect(() => {
    setIsWrapper(colCount <= 3);
  }, [ colCount ])

  if (isLoading) return null;

  const classIsWrapped = isWrapperd ? styles.wrapped : null;

  return (
    <div className={`${styles.searchKeyword} ${classIsWrapped}`}>
      <ResponsiveGridWrapper onColCountChanged={setColCount}>
        <div className={styles.topResultContainer}>
          <SearchResultCard onNavigated={addHistoryItem} data={arrTracks[0]} />
        </div>
        <div className={styles.tracksContainer}>
          <SearchResultTracks arrTracks={arrTracks} />
        </div>
      </ResponsiveGridWrapper>

      <CardsRow
        onNavigated={addHistoryItem}
        title={"Artists"}
        arrData={arrArtists}
      />
      <CardsRow
        onNavigated={addHistoryItem}
        title={"Playlists"}
        arrData={arrPlaylists}
      />
      <CardsRow
        onNavigated={addHistoryItem}
        title={"Albums"}
        arrData={arrAlbums}
      />
      <CardsRow
        title={"Podcasts"}
        arrData={arrShows}
      />
      <CardsRow
        title={"Episodes"}
        arrData={arrEpisodes}
      />
    </div>
  )
}

export default SearchKeyword;
