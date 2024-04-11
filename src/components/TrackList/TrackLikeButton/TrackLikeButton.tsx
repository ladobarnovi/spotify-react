import styles from "./TrackLikeButton.module.scss";
import { createPortal } from "react-dom";
import { useState } from "react";
import IconCirclePlus from "../../Icons/IconCirclePlus";
import AddTrackToPlaylistPopup from "../../AddTrackToPlaylistPopup/AddTrackToPlaylistPopup";

interface IProps {
  trackId: string;
}
function TrackLikeButton({ trackId }: IProps) {
  const [ position, setPosition ] = useState({ top: 0, left: 0 });
  const [ isPopupActive, setIsPopupActive ] = useState(false);

  function onButtonClick(event: React.MouseEvent): void {
    event.stopPropagation();
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setIsPopupActive(true);
    setPosition({
      top,
      left
    })
  }

  const elPortal = isPopupActive ? createPortal((
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      className={styles.popupContainer}
    >
      <AddTrackToPlaylistPopup
        onClose={() => setIsPopupActive(false)}
        trackId={trackId}
      />
    </div>
  ), document.body) : null;

  return (
    <div className={styles.trackLikeButton}>
      <button onClick={onButtonClick}>
        <IconCirclePlus />
      </button>

      { elPortal }
    </div>
  )
}

export default TrackLikeButton