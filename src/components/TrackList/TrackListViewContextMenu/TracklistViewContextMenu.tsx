import styles from "./TrackListViewContextMenu.module.scss";
import ContextMenu, { IContextMenuOptions } from "components/ContextMenu/ContextMenu";
import IconList from "components/Icons/IconList";
import IconListCompact from "components/Icons/IconListCompact";
import { useState } from "react";
import { capitalizeFirstLetter } from "utils/string";

export enum ETracklistViewType {
  list = "list",
  compact = "compact",
}

interface IProps {
  onViewChanged: (isCompact: boolean) => void
}

function TracklistViewContextMenu({ onViewChanged }: IProps) {
  const [ viewType, setViewType ] = useState(ETracklistViewType.list);

  function contextMenuClickHandler(type: ETracklistViewType) {
    setViewType(type);
    onViewChanged(type === ETracklistViewType.compact);
  }

  const contextMenuOptions: IContextMenuOptions = {
    alignment: "right",
    arrSections: [
      {
        title: "View as",
        arrItems: [
          {
            title: "List",
            onClick: () => contextMenuClickHandler(ETracklistViewType.list),
            isActive: viewType === ETracklistViewType.list,
            icon: (<IconList />),
            closeOnAction: true,
          },
          {
            title: "Compact",
            onClick: () => contextMenuClickHandler(ETracklistViewType.compact),
            isActive: viewType === ETracklistViewType.compact,
            icon: (<IconListCompact />),
            closeOnAction: true,
          }
        ]
      }
    ]
  };

  const elIcon = viewType === ETracklistViewType.list ? <IconList /> : <IconListCompact />;

  return (
    <div className={ styles.tracklistViewContextMenu }>
      <ContextMenu options={ contextMenuOptions }>
        <button>
          <span>{ capitalizeFirstLetter(viewType) }</span>
          { elIcon }
        </button>
      </ContextMenu>
    </div>
  )
}

export default TracklistViewContextMenu;
