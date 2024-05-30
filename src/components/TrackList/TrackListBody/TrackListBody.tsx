import styles from "./TrackListBody.module.scss";
import { useTrackListContext } from "../TrackListContext";
import { ITrackContainer } from "types/track";
import TrackItem from "./TrackItem/TrackItem";
import moment from "moment/moment";

interface IProps {
  arrTrackContainers: ITrackContainer[];
}
export default function TrackListBody({ arrTrackContainers }: IProps) {
  const {  } = useTrackListContext();

  const elTracks = arrTrackContainers.map((trackContainer: ITrackContainer, index) => {
    const track = trackContainer.track;
    const date = trackContainer.added_at.split("T")[0];
    const formattedDate = moment(date).format("MMM DD, yyyy");

    return (
      <TrackItem
        key={track.id}
        index={index}
        track={track}
        date={formattedDate}
      />
    )
  })

  return (
    <div className={styles.trackListBody}>
      {elTracks}
    </div>
  )
}