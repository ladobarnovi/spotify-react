import styles from "./PlaylistContextMenu.module.scss"
import { IPlaylist } from "types/playlist";
import ContextMenu, { IContextMenuOptions } from "components/ContextMenu/ContextMenu";
import IconEllipsis from "components/Icons/IconEllipsis";

interface IProps {
  playlist: IPlaylist;
}

function PlaylistContextMenu({ playlist }: IProps) {
  const contextMenuOptions: IContextMenuOptions = {
    arrSections: [
      {
        arrItems: [
          {
            title: "Add to your library",
            onClick: () => { },
          },
          {
            title: "Add to queue",
            onClick: () => { },
          },
          {
            title: "Go to artist radio",
            onClick: () => { },
          }
        ]
      },
      {
        arrItems: [
          {
            title: "Add to playlist",
            onClick: () => { },
          }
        ]
      },
      {
        arrItems: [
          {
            title: "Share",
            onClick: () => { },
          }
        ]
      }
    ],
    alignment: "left",
  }

  return (
    <div className={ styles.playlistContextMenu }>
      <ContextMenu options={contextMenuOptions}>
        <button>
          <IconEllipsis />
        </button>
      </ContextMenu>
    </div>
  )
}

export default PlaylistContextMenu;
