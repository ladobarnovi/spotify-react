import styles from "./PlayerLeftSection.module.scss"
import { NavLink } from "react-router-dom";
import { usePlayer } from "hooks/usePlayer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import IconChevronDown from "components/Icons/IconChevronDown";
import IconChevronUp from "components/Icons/IconChevronUp";
import { setIsNowPlayingActive } from "store/global/globalSlice";

function PlayerLeftSection() {
  const dispatch = useDispatch();
  const isNowPlayingActive = useSelector((state: RootState) => state.globalReducer.isNowPlayingActive);
  const { trackName, trackAlbum, trackArtists, getUriId, contextUri, getUriType } = usePlayer()

  if (trackAlbum == null || trackName == null || trackArtists == null || contextUri == null) {
    return <div/>;
  }

  const albumId = getUriId(trackAlbum.uri);
  const artistId = getUriId(trackArtists[0].uri);
  const contextType = getUriType(contextUri);
  const contextId = getUriId(contextUri);

  const elChevronIcon = isNowPlayingActive ? <IconChevronDown/> : <IconChevronUp />

  function onSidebarToggleClick(): void {
    dispatch(setIsNowPlayingActive(!isNowPlayingActive));
  }

  return (
    <div className={ styles.playerLeftSection }>
      <NavLink to={`/${contextType}/${contextId}`} className={styles.imageContainer}>
        <button onClick={onSidebarToggleClick} className={styles.sidebarToggleButton}>
          { elChevronIcon }
        </button>
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
