import styles from "./DiscographyFilterContextMenu.module.scss"
import ContextMenu, { IContextMenuOptions } from "components/ContextMenu/ContextMenu";
import { useEffect, useState } from "react";
import { EAlbumType } from "types/album";
import IconArrowDown from "components/Icons/IconArrowDown";
import IconArrowUp from "components/Icons/IconArrowUp";

interface IProps {
  onAlbumTypeChanged: (type: EAlbumType) => void
}

const arrAlbumTypes = [
  {
    title: "All",
    key: EAlbumType.all,
  },
  {
    title: "Albums",
    key: EAlbumType.album,
  },
  {
    title: "Singles & EPs",
    key: EAlbumType.single,
  },
  {
    title: "Compilations",
    key: EAlbumType.compilation,
  },
];

function DiscographyFilterContextMenu({ onAlbumTypeChanged }: IProps) {
  const [ albumType, setAlbumType ] = useState(EAlbumType.all);
  const [ albumTypeTitle, setAlbumTypeTitle ] = useState("All");
  const [ isMenuActive, setIsMenuActive ] = useState(false);

  useEffect(() => {
    const item = arrAlbumTypes.find((item) => (
      item.key === albumType)
    );

    setAlbumTypeTitle(item == null ? "" : item.title);
    onAlbumTypeChanged(albumType);
  }, [ albumType ]);

  const contextMenuOptions: IContextMenuOptions = {
    alignment: "right",
    arrSections: [
      {
        arrItems: (() => (
          arrAlbumTypes.map(item => ({
            title: item.title,
            isActive: item.key === albumType,
            onClick: () => { setAlbumType(item.key); },
            closeOnAction: true,
          }))
        ))()
      },
    ],
  };

  const elArrowIcon = isMenuActive ? <IconArrowUp /> : <IconArrowDown />;

  return (
    <div className={styles.discographyFilterContextMenu}>
      <ContextMenu options={contextMenuOptions} onMenuToggled={setIsMenuActive}>
        <button>
          <span>{ albumTypeTitle }</span>
          { elArrowIcon }
        </button>
      </ContextMenu>
    </div>
  )
}

export default DiscographyFilterContextMenu;
