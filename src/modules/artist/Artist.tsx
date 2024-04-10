import styles from "./Artist.module.scss";
import { useEffect, useState } from "react";
import { api } from "api";
import { useParams } from "react-router-dom";
import { usePlayer } from "hooks/usePlayer";
import { useQuery } from "react-query";
import ArtistHeader from "modules/artist/components/ArtistHeader/ArtistHeader";
import PlayButton from "components/PlayButton/PlayButton";
import TopTracks from "modules/artist/components/TopTracks/TopTracks";
import ArtistDiscography from "modules/artist/components/ArtistDiscography/ArtistDiscography";
import FollowButton from "modules/artist/components/FollowButton/FollowButton";
import ArtistContextMenu from "modules/artist/components/ArtistContextMenu/ArtistContextMenu";
import ArtistRelatedItems from "./components/ArtistRelatedItems/ArtistRelatedItems";

function Artist() {
  const [ arrTrackUris, setArrTrackUris ] = useState<string[]>([]);
  const [ isContextPlaying, setIsContextPlaying ] = useState(false);
  const [ isContextPaused, setIsContextPaused ] = useState(false)

  const { deviceId, trackUri, togglePlay, isPlaying, isPaused } = usePlayer();
  const { id }  = useParams();

  const { data: artist } = useQuery({
    queryKey: [ "fetchArtist", id ],
    queryFn: async () => {
      return await api.artists.getArtist({ artistId: id as string })
    }
  })

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
    const isTopTrackActive = arrTrackUris.find((uri) => uri === trackUri) != null;
    setIsContextPlaying(isPlaying && isTopTrackActive);
    setIsContextPaused(isPaused && isTopTrackActive);
  }, [ trackUri, isPlaying, isPaused ]);

  if (artist == null) return null;

  return (
    <div className={styles.artist}>
      <ArtistHeader artist={artist} />

      <div className={styles.artistBody}>
        <div className={styles.artistControls}>
          <PlayButton isPlaying={isContextPlaying} onClick={onPlayButtonClicked} />
          <FollowButton entity={artist} />
          <ArtistContextMenu artist={artist} />
        </div>

        <TopTracks
          artistId={id as string}
          onTracksFetched={(arrUris) => setArrTrackUris(arrUris)}
        />
        <ArtistDiscography artistId={artist.id} />
        <ArtistRelatedItems artistId={id as string} />
      </div>
    </div>
  );
}

export default Artist;
