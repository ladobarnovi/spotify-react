import styles from "./ArtistHeader.module.scss";
import { IArtist } from "types/artist";
import EntityHeaderWrapper from "components/EntityHeaderWrapper/EntityHeaderWrapper";
import EntityHeaderTitle from "components/EntityHeaderTitle/EntityHeaderTitle";
import { formatNumber } from "utils/number";

interface IProps {
  artist: IArtist;
}

function ArtistHeader({ artist }: IProps) {
  const { name, followers } = artist
  const imageUrl = artist.images[0].url;
  const listeners = formatNumber(followers.total);

  return (
    <EntityHeaderWrapper padding={"small"} imageUrl={imageUrl}>
      <div className={styles.imageContainer}>
        <img src={artist.images[0].url} alt={name} />
      </div>

      <div className={styles.infoContainer}>
        <EntityHeaderTitle title={name} />
        <p className={styles.listeners}>{ listeners } monthly listeners</p>
      </div>
    </EntityHeaderWrapper>
  );
}

export default ArtistHeader;
