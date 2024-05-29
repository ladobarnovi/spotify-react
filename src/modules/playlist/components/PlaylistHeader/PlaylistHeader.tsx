import styles from "./PlaylistHeader.module.scss";
import EntityHeaderWrapper from "components/EntityHeaderWrapper/EntityHeaderWrapper";
import { IPlaylist } from "types/playlist";
import { NavLink } from "react-router-dom";
import { getFullDuration } from "utils/duration";

interface IProps {
  playlist: IPlaylist;
}
export default function PlaylistHeader({ playlist }: IProps) {
  const { description, owner } = playlist;

  const duration = getFullDuration(playlist.tracks.items.map(item => item.track))

  return (
    <EntityHeaderWrapper
      image={playlist.images[0]}
      title={playlist.name}
      type={playlist.type}
    >
      { description ? <p className={styles.description}>{ description }</p> : null }

      <div className={styles.additionalInfo}>
        <Owner owner={owner}/>
        <span>•</span>
        <p>{playlist.tracks.total} songs,</p>
        <p>{duration}</p>
      </div>

    </EntityHeaderWrapper>
  )
}

interface IOwnerProps {
  owner: {
    id: string;
    display_name: string;
  }
}
function Owner({ owner }: IOwnerProps) {
  return owner ? (
    <NavLink to={`/user/${owner.id}`} className={ styles.owner }>
      <p>{ owner?.display_name }</p>
    </NavLink>
  ) : null;
}