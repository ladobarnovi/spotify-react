import styles from "./FollowButton.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "store";
import { api } from "api";
import { addFollowedEntityId, removeFollowedEntityId } from "store/user/userSlice";
import { IEntityBase } from "types/entityBase";

interface IProps {
  entity: IEntityBase;
}

function FollowButton({ entity }: IProps) {
  const dispatch = useDispatch();
  const arrFollowedEntityIds = useSelector((state: RootState) => state.userReducer.arrFollowedEntityIds);
  const [ isFollowed, setIsFollowed ] = useState(false);

  async function toggleFollow() {
    const { id, type } = entity;

    if (type === "artist") {
      await toggleArtistFollow();
    }
    else if (type === "show") {
      await toggleShowFollow();
    }

    dispatch(isFollowed ? removeFollowedEntityId(id) : addFollowedEntityId(id));
  }

  async function toggleArtistFollow(): Promise<void> {
    const { id } = entity;

    isFollowed ?
      await api.me.unfollowArtist({ artistId: id }) :
      await api.me.followArtist({ artistId: id });
  }

  async function toggleShowFollow(): Promise<void> {
    const { id } = entity;

    isFollowed ?
      await api.shows.followShow({ showId: id }) :
      await api.shows.unfollowShow({ showId: id })
  }

  useEffect(() => {
    setIsFollowed(arrFollowedEntityIds.some((id) => id === entity.id));
  }, [ arrFollowedEntityIds ]);

  return (
    <button onClick={toggleFollow} className={ styles.followButton }>
      { isFollowed ? "Unfollow" : "Follow" }
    </button>
  )
}

export default FollowButton;
