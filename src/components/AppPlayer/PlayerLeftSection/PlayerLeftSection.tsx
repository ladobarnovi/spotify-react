import styles from "./PlayerLeftSection.module.scss"
import { NavLink } from "react-router-dom";
import { usePlayer } from "hooks/usePlayer";

function PlayerLeftSection() {
  const { trackName, trackAlbum, trackArtists, getUriId, contextUri, getUriType } = usePlayer()

  if (trackAlbum == null || trackName == null || trackArtists == null || contextUri == null) {
    return <div/>;
  }

  const albumId = getUriId(trackAlbum.uri);
  const artistId = getUriId(trackArtists[0].uri);
  const contextType = getUriType(contextUri);
  const contextId = getUriId(contextUri);

  return (
    <div className={ styles.playerLeftSection }>
      <NavLink to={`/${contextType}/${contextId}`} className={styles.imageContainer}>
        <img src={trackAlbum.images[0].url} alt={trackName} />
      </NavLink>

      <div className={styles.infoContainer}>
        <NavLink to={`/album/${albumId}`} className={styles.name}>
          { trackName }
        </NavLink>
        <NavLink to={`/artist/${artistId}`} className={styles.artist}>
          { trackArtists[0].name }
        </NavLink>
      </div>


    </div>
  )
}

export default PlayerLeftSection;
