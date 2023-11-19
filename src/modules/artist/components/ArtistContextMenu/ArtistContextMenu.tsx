import styles from "./ArtistContextMenu.module.scss"
import ContextMenu, { IContextMenuOptions } from "components/ContextMenu/ContextMenu";
import IconEllipsis from "components/Icons/IconEllipsis";
import { IArtist } from "types/artist";
import IconFollow from "components/Icons/IconFollow";
import IconRadio from "components/Icons/IconRadio";
import IconReport from "components/Icons/IconReport";
import IconShare from "components/Icons/IconShare";

interface IProps {
  artist: IArtist;
}

function ArtistContextMenu({ artist }: IProps) {
  const contextMenuOptions: IContextMenuOptions = {
    alignment: "left",
    arrSections: [
      {
        arrItems: [
          {
            title: "Follow",
            onClick: () => { },
            icon: (<IconFollow />),
          },
          {
            title: "Go to artist radio",
            onClick: () => { },
            icon: (<IconRadio />),
          },
          {
            title: "Report",
            onClick: () => { },
            icon: (<IconReport />),
          },
          {
            title: "Share",
            onClick: () => { },
            icon: (<IconShare />),
          }
        ]
      }
    ]
  }

  return (
    <div className={styles.artistContextMenu}>
      <ContextMenu options={contextMenuOptions}>
        <button>
          <IconEllipsis />
        </button>
      </ContextMenu>
    </div>
  )
}

export default ArtistContextMenu;
