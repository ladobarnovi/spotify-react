import styles from "./Artist.module.scss";
import ArtistHeader from "modules/artist/components/ArtistHeader/ArtistHeader";
import { useEffect, useState } from "react";
import { api } from "api";
import { useParams } from "react-router-dom";
import { IArtist } from "types/artist";
import { IAlbum } from "types/album";
import { ITrack } from "types/track";
import PlayButton from "components/PlayButton/PlayButton";
import TopTracks from "modules/artist/components/TopTracks/TopTracks";
import ArtistDiscography from "modules/artist/components/ArtistDiscography/ArtistDiscography";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import FollowButton from "modules/artist/components/FollowButton/FollowButton";
import ArtistContextMenu from "modules/artist/components/ArtistContextMenu/ArtistContextMenu";
import { usePlayer } from "hooks/usePlayer";

function Artist() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ artist, setArtist ] = useState<IArtist>();
  const [ arrAlbums, setArrAlbums ] = useState<IAlbum[]>([])
  const [ arrTopTracks, setArrTopTracks ] = useState<ITrack[]>([])
  const [ arrRelatedArtists, setArrRelatedArtists ] = useState<IArtist[]>([]);
  const [ arrTrackUris, setArrTrackUris ] = useState<string[]>([]);
  const [ isContextPlaying, setIsContextPlaying ] = useState(false);
  const [ isContextPaused, setIsContextPaused ] = useState(false)

  const { deviceId, trackId, togglePlay, isPlaying, isPaused } = usePlayer();
  const { id } = useParams();

  async function fetchArtistInfo() {
    const response = await api.artists.getArtist({ artistId: id as string })
    setArtist(response);
  }

  async function fetchTopTracks() {
    const response = await api.artists.topTracks({ artistId: id as string });
    setArrTopTracks(response.tracks);
  }

  async function fetchArtistAlbums() {
    const response = await api.artists.albums({ artistId: id as string });
    setArrAlbums(response.items);
  }

  async function fetchRelatedArtists() {
    const response = await api.artists.relatedArtists({ artistId: id as string });
    setArrRelatedArtists(response.artists);
  }

  async function onPlayButtonClicked(): Promise<void> {
    if (isContextPlaying || isContextPaused) {
      await togglePlay()
    }
    else {
      await api.player.play({
        deviceId,
        data: {
          uris: arrTrackUris,
          offset: {
            position: 0,
          },
        },
      });
    }
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        fetchArtistInfo(),
        fetchTopTracks(),
        fetchArtistAlbums(),
        fetchRelatedArtists()
      ])

      setIsLoading(false);
    })()
  }, [ ]);

  useEffect(() => {
    setArrTrackUris(arrTopTracks == null ? [] : arrTopTracks.map(track => track.uri));
  }, [ arrTopTracks ]);

  useEffect(() => {
    const isTopTrackActive = arrTopTracks.find((track) => track.id === trackId) != null;
    setIsContextPlaying(isPlaying && isTopTrackActive);
    setIsContextPaused(isPaused && isTopTrackActive);
  }, [ trackId, isPlaying, isPaused ]);

  if (isLoading || artist == null) return null;

  return (
    <div className={styles.artist}>
      <ArtistHeader artist={artist} />

      <div className={styles.artistBody}>
        <div className={styles.artistControls}>
          <PlayButton isPlaying={isContextPlaying} onClick={onPlayButtonClicked} />
          <FollowButton entity={artist} />
          <ArtistContextMenu artist={artist} />
        </div>

        <TopTracks arrTracks={arrTopTracks} />
        <ArtistDiscography arrAlbums={arrAlbums} artistId={artist.id} />

        <CardsRow
          title={"Fans also like"}
          arrData={arrRelatedArtists}
          url={`/artist/${id}/related`}
        />
      </div>
    </div>
  );
}

export default Artist;
