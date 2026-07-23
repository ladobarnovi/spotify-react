import styles from "./TrackHeader.module.scss"

import { ITrack } from "types/track";
import EntityHeaderWrapper from "components/EntityHeaderWrapper/EntityHeaderWrapper";
import LinkUnderline from "components/LinkUnderline/LinkUnderline";

interface IProps {
  track: ITrack;
}

function TrackHeader({ track }: IProps) {
  const { album, artists } = track;

  return (
    <div className={ styles.trackHeader }>
      <EntityHeaderWrapper
        type={"Song"}
        image={track.album.images[0]}
        title={track.name}
      >
        <LinkUnderline url={`/album/${album.id}`}>{ album.name }</LinkUnderline>
      </EntityHeaderWrapper>
    </div>
  )
}

export default TrackHeader;
