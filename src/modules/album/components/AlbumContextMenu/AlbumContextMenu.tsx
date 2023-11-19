import styles from "./AlbumContextMenu.module.scss"
import ContextMenu, { IContextMenuOptions } from "components/ContextMenu/ContextMenu";
import IconEllipsis from "components/Icons/IconEllipsis";
import IconCirclePlus from "components/Icons/IconCirclePlus";
import IconAddQueue from "components/Icons/IconAddQueue";
import IconRadio from "components/Icons/IconRadio";
import IconPlus from "components/Icons/IconPlus";
import IconShare from "components/Icons/IconShare";

interface IProps {

}

function AlbumContextMenu({  }: IProps) {
  const contextMenuOptions: IContextMenuOptions = {
    alignment: "left",
    arrSections: [
      {
        arrItems: [
          {
            title: "Add to Your Library",
            onClick: () => {},
            icon: (<IconCirclePlus />),
          },
          {
            title: "Add to queue",
            onClick: () => {},
            icon: (<IconAddQueue />),
          },
          {
            title: "Go to artist radio",
            onClick: () => {},
            icon: (<IconRadio />),
          }
        ],
      },
      {
        arrItems: [
          {
            title: "Add to playlist",
            onClick: () => {},
            icon: (<IconPlus />),
          }
        ]
      },
      {
        arrItems: [
          {
            title: "Share",
            onClick: () => {},
            icon: (<IconShare />),
          }
        ]
      }
    ]
  }

  return (
    <div className={ styles.albumContextMenu }>
      <ContextMenu options={contextMenuOptions}>
        <button>
          <IconEllipsis />
        </button>
      </ContextMenu>
    </div>
  )
}

export default AlbumContextMenu;
