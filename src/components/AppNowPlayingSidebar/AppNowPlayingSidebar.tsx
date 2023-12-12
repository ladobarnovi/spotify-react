import styles from "./AppNowPlayingSidebar.module.scss"
import { usePlayer } from "hooks/usePlayer";
import { useEffect, useState } from "react";
import { ITrack } from "types/track";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { api } from "api";
import NowPlayingTrack from "components/AppNowPlayingSidebar/NowPlayingTrack/NowPlayingTrack";
import NowPlayingArtist from "components/AppNowPlayingSidebar/NowPlayingArtist/NowPlayingArtist";

function AppNowPlayingSidebar() {
  const [ track, setTrack ] = useState<ITrack>();
  const [ album, setAlbum ] = useState<IAlbum>();
  const [ artist, setArtist ] = useState<IArtist>();

  const { trackId, trackArtists, getUriId } = usePlayer();

  useEffect(() => {
    if (trackId == null) return;
    (async () => {
      const response = await api.tracks.getTrack({ trackId })
      setTrack(response);
    })()
  }, [ trackId ]);

  useEffect(() => {
    if (trackArtists == null) return;
    (async () => {
      const artist = trackArtists[0];
      const artistId = getUriId(artist.uri);
      const response = await api.artists.getArtist({ artistId });
      setArtist(response);
    })()
  }, [ trackArtists ]);

  if (track == null || artist == null) return <div />;


  return (
    <div className={styles.appNowPlayingSidebar}>
      <NowPlayingTrack track={track} />
      <NowPlayingArtist artist={artist} />
    </div>
  )
}

export default AppNowPlayingSidebar;
