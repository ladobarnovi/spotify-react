import styles from "./NowPlayingArtist.module.scss"
import { IArtist } from "types/artist";
import { NavLink } from "react-router-dom";
import FollowButton from "modules/artist/components/FollowButton/FollowButton";

interface IProps {
  artist: IArtist;
}

function NowPlayingArtist({ artist }: IProps) {
  const { name, id, followers, images } = artist;

  const imageUrl = images[0].url;

  return (
    <div className={ styles.nowPlayingArtist }>
      <p className={styles.label}>About the artist</p>

      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} />
      </div>

      <div className={styles.infoContainer}>
        <NavLink to={`/artist/${id}`}>
          { name }
        </NavLink>

        <div className={styles.midWrapper}>
          <p className={styles.listeners}>{ followers.total } monthly listeners</p>
          <FollowButton entity={artist} />
        </div>

        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Amet massa vitae tortor condimentum lacinia quis. Cras fermentum odio eu feugiat pretium.
          Id aliquet lectus proin nibh nisl condimentum id venenatis.
          Tempor commodo ullamcorper a lacus vestibulum sed arcu non.
          Quisque non tellus orci ac auctor augue.
        </p>
      </div>
    </div>
  )
}

export default NowPlayingArtist;
