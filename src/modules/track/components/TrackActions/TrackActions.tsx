import styles from "./TrackActions.module.scss"
import { ITrack } from "types/track";
import LikeButton from "components/LikeButton/LikeButton";
import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";

interface IProps {
  track: ITrack;
}

function TrackActions({ track }: IProps) {
  return (
    <div className={styles.trackActions}>
      <ContextPlayButton uri={track.uri} />
      <LikeButton data={track} />
    </div>
  )
}

export default TrackActions;
