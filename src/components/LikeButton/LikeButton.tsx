import styles from "./LikeButton.module.scss"
import IconHeart from "components/Icons/IconHeart";
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { api } from "api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect, useState } from "react";
import IconHeartFilled from "components/Icons/IconHeartFilled";
import { addFollowedEntityId, removeFollowedEntityId } from "store/user/userSlice";
import { ITrack } from "types/track";

interface IProps {
  data: IPlaylist|IAlbum|ITrack;
  className?: string;
}

function LikeButton({ data, className }: IProps) {
  const dispatch = useDispatch();
  const arrFollowedEntityIds = useSelector((state: RootState) => state.userReducer.arrFollowedEntityIds);
  const [ isFollowed, setIsFollowed ] = useState(false);

  async function toggleFollow() {
    const id = data.id;
    const type = data.type;

    if (type === "playlist") {
      isFollowed ?
        await api.playlist.unfollowPlaylist({ playlistId: id }) :
        await api.playlist.followPlaylist({ playlistId: id });
    }
    else if (type === "album") {
      isFollowed ?
        await api.me.unfollowAlbum({ albumId: id }) :
        await api.me.followAlbum({ albumId: id });
    }

    dispatch(isFollowed ? removeFollowedEntityId(id) : addFollowedEntityId(id));
  }

  useEffect(() => {
    setIsFollowed(arrFollowedEntityIds.some((id) => id === data.id));
  }, [ arrFollowedEntityIds ]);

  const elIcon = isFollowed ? (<IconHeartFilled />) : (<IconHeart />)

  return (
    <button onClick={toggleFollow} className={`${styles.likeButton} ${className} ${isFollowed ? styles.active : ""}`}>
      { elIcon }
    </button>
  )
}

export default LikeButton;
