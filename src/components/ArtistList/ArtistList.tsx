import styles from "./ArtistList.module.scss";
import { IArtist } from "types/artist";
import { NavLink } from "react-router-dom";

interface IProps {
  artists: IArtist[];
  separator?: string;
}

function ArtistList(props: IProps) {
  return (
    <div className={styles.artistList}>
      {
        props.artists.map((artist, index) => [
          index > 0 && ", ",
          <NavLink
            key={index}
            to={`/artist/${artist.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            {artist.name}
          </NavLink>
        ])
      }
    </div>
  );
}

export default ArtistList;
