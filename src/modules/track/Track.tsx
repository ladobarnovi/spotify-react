import styles from "./Track.module.scss"
import TrackHeader from "modules/track/components/TrackHeader/TrackHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "api";
import { ITrack } from "types/track";
import TrackActions from "modules/track/components/TrackActions/TrackActions";
import TrackArtistList from "modules/track/components/TrackArtistList/TrackArtistList";
import { IArtist } from "types/artist";
import TrackRecommendations from "modules/track/components/TrackRecommendations/TrackRecommendations";
import TrackArtistTopTracks from "modules/track/components/TrackArtistTopTracks/TrackArtistTopTracks";
import TrackArtistTopAlbums from "modules/track/components/TrackArtistTopAlbums/TrackArtistTopAlbums";

function Track() {
  const [ track, setTrack ] = useState<ITrack>();
  const [ arrArtists, setArrArtists ] = useState<IArtist[]>();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const trackResponse = await api.tracks.GetTrack({ trackId: id as string })
      setTrack(trackResponse);
      const arrArtistIds = trackResponse.artists.map((artist) => artist.id);
      const artistResponse = await api.artists.GetSeveralArtists({ arrIds: arrArtistIds });
      setArrArtists(artistResponse.artists);
    })()
  }, [ id ]);

  if (track == null || arrArtists == null) return null;

  return (
    <div className={styles.track}>
      <TrackHeader track={track} />

      <main className={styles.trackBody}>
        <TrackActions track={track} />
        <TrackArtistList arrArtists={arrArtists} />
        <TrackRecommendations trackId={track.id} />
        <TrackArtistTopTracks artist={arrArtists[0]} />
        <TrackArtistTopAlbums arrArtists={arrArtists} />
      </main>
    </div>
  )
}

export default Track;
