import styles from "./ArtistHeader.module.scss";
import { IArtist } from "types/artist";
import EntityHeaderWrapper from "components/EntityHeaderWrapper/EntityHeaderWrapper";
import { formatNumber } from "utils/number";

interface IProps {
  artist: IArtist;
}

function ArtistHeader({ artist }: IProps) {
  const { name, followers } = artist
  const listeners = formatNumber(followers.total);

  return (
    <EntityHeaderWrapper image={artist.images[0]} title={name}>
      <p className={styles.listeners}>{ listeners } monthly listeners</p>
    </EntityHeaderWrapper>
  );
}

export default ArtistHeader;
