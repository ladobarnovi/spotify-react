import styles from "./FollowButton.module.scss"
import { IArtist } from "types/artist";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "store";
import { api } from "api";
import { addFollowedEntityId, removeFollowedEntityId } from "store/user/userSlice";

interface IProps {
  artist: IArtist;
}

function FollowButton({ artist }: IProps) {
  const dispatch = useDispatch();
  const arrFollowedEntityIds = useSelector((state: RootState) => state.userReducer.arrFollowedEntityIds);
  const [ isFollowed, setIsFollowed ] = useState(false);

  async function toggleFollow() {
    const { id } = artist;

    isFollowed ?
      await api.me.unfollowArtist({ artistId: id }) :
      await api.me.followArtist({ artistId: id });

    dispatch(isFollowed ? removeFollowedEntityId(id) : addFollowedEntityId(id));
  }

  useEffect(() => {
    setIsFollowed(arrFollowedEntityIds.some((id) => id === artist.id));
  }, [ arrFollowedEntityIds ]);

  return (
    <button onClick={toggleFollow} className={ styles.followButton }>
      { isFollowed ? "Unfollow" : "Follow" }
    </button>
  )
}

export default FollowButton;
