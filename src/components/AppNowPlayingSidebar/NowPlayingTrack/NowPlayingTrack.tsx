import styles from "./NowPlayingTrack.module.scss"
import { usePlayer } from "hooks/usePlayer";
import { useEffect } from "react";
import { ITrack } from "types/track";
import { NavLink } from "react-router-dom";
import ArtistList from "components/ArtistList/ArtistList";
import LikeButton from "components/LikeButton/LikeButton";

interface IProps {
  track: ITrack;
}

function NowPlayingTrack({ track }: IProps) {
  const { album, artists, name: trackName } = track;
  const { id: albumId, name: albumName, images } = album;

  const imageUrl = images[0].url;

  return (
    <div className={styles.nowPlayingTrack}>
      <NavLink to={`/album/${albumId}`} className={styles.album}>
        { albumName }
      </NavLink>

      <NavLink to={`/album/${albumId}`} className={styles.imageContainer}>
        <img src={imageUrl} alt={albumName} />
      </NavLink>

      <div className={styles.bottomWrapper}>
        <div className={styles.trackInfo}>
          <NavLink to={`/album/${albumId}`} className={styles.trackName}>
            { trackName }
          </NavLink>

          <ArtistList artists={artists} />
        </div>

        <LikeButton data={track} />
      </div>
    </div>
  )
}

export default NowPlayingTrack;
