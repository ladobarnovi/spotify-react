import styles from "./TrackArtistList.module.scss"
import { IArtist } from "types/artist";
import LinkUnderline from "components/LinkUnderline/LinkUnderline";
import { useNavigate } from "react-router-dom";
import IconArtist from "components/Icons/IconArtist";

interface IProps {
  arrArtists: IArtist[];
}

function TrackArtistList({ arrArtists }: IProps) {
  const navigate = useNavigate();
  const elArtists = arrArtists.map((artist) => {
    const { name, id, images } = artist;
    const url = `/artist/${ id }`;
    const imageUrl = images[images.length - 1]?.url;
    const elImage = imageUrl == null ? <IconArtist /> : <img src={ imageUrl } alt={ name }/>;

    return (
      <button
        className={ styles.artistButton }
        key={artist.id}
        onClick={() => navigate(url)}
      >
        <div className={ styles.imageContainer }>
          { elImage }
        </div>
        <div className={ styles.nameWrapper }>
          <p className={ styles.label }>Artist</p>
          <LinkUnderline url={ url }>
            { name }
          </LinkUnderline>
        </div>
      </button>
    )
  })

  return (
    <div className={styles.trackArtistList}>
      { elArtists }
    </div>
  )
}

export default TrackArtistList;
