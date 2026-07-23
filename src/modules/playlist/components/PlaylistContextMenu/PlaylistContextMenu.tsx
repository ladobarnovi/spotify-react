import styles from "./PlaylistContextMenu.module.scss"
import { IPlaylist } from "types/playlist";
import ContextMenu, { IContextMenuOptions } from "components/ContextMenu/ContextMenu";
import IconEllipsis from "components/Icons/IconEllipsis";
import IconCirclePlus from "components/Icons/IconCirclePlus";
import IconAddQueue from "components/Icons/IconAddQueue";
import IconRadio from "components/Icons/IconRadio";
import IconPlus from "components/Icons/IconPlus";
import IconShare from "components/Icons/IconShare";

interface IProps {
  playlist: IPlaylist;
}

function PlaylistContextMenu({ playlist }: IProps) {
  const contextMenuOptions: IContextMenuOptions = {
    arrSections: [
      {
        arrItems: [
          {
            title: "Add to Your Library",
            onClick: () => { },
            icon: (<IconCirclePlus />),
          },
          {
            title: "Add to queue",
            onClick: () => { },
            icon: (<IconAddQueue />),
          },
          {
            title: "Go to artist radio",
            onClick: () => { },
            icon: (<IconRadio />),
          }
        ]
      },
      {
        arrItems: [
          {
            title: "Add to playlist",
            onClick: () => { },
            icon: (<IconPlus />),
          }
        ]
      },
      {
        arrItems: [
          {
            title: "Share",
            onClick: () => { },
            icon: (<IconShare />),
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
