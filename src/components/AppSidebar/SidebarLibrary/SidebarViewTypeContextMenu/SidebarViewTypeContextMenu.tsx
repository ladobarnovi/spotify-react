import styles from "./SidebarViewTypeContextMenu.module.scss"
import ContextMenu, { IContextMenuOptions } from "components/ContextMenu/ContextMenu";
import IconList from "components/Icons/IconList";
import { useState } from "react";
import IconListCompact from "components/Icons/IconListCompact";
import IconGrid from "components/Icons/IconGrid";

interface IProps {
  onViewTypeChanged: (viewType: EViewOptions) => void,
  onSortingChanged: (sortby: ESortingOptions) => void,
}

export enum ESortingOptions {
  recent = "recent",
  recentlyAdded = "recentlyAdded",
  alphabetical = "alphabetical",
  creator = "creator",
}

export enum EViewOptions {
  compact = "compact",
  list = "list",
  grid = "grid",
}

export const ARR_SORTING_OPTIONS = [
  { title: "Recents", key: ESortingOptions.recent },
  { title: "Recently added", key: ESortingOptions.recentlyAdded },
  { title: "Alphabetical", key: ESortingOptions.alphabetical },
  { title: "Creator", key: ESortingOptions.creator },
];

export const ARR_VIEW_OPTIONS = [
  { title: "Compact", key: EViewOptions.compact, icon: <IconListCompact /> },
  { title: "List", key: EViewOptions.list, icon: <IconList /> },
  { title: "Grid", key: EViewOptions.grid, icon: <IconGrid /> },
];

function SidebarViewTypeContextMenu({ onViewTypeChanged, onSortingChanged }: IProps) {
  const [ sortBy, setSortBy ] = useState(ESortingOptions.recent);
  const [ viewType, setViewType ] = useState(EViewOptions.list);

  function sortingChangeHandler(sortBy: ESortingOptions) {
    setSortBy(sortBy);
    onSortingChanged(sortBy);
  }

  function viewChangeHandler(viewType: EViewOptions) {
    setViewType(viewType);
    onViewTypeChanged(viewType);
  }

  const contextMenuOptions: IContextMenuOptions = {
    alignment: "right",
    arrSections: [
      {
        title: "Sort by",
        arrItems: (() => ARR_SORTING_OPTIONS.map((item) => ({
          title: item.title,
          onClick: () => sortingChangeHandler(item.key),
          isActive: item.key === sortBy,
        })))()
      },
      {
        title: "View as",
        arrItems: (() => ARR_VIEW_OPTIONS.map((item) => ({
          title: item.title,
          onClick: () => viewChangeHandler(item.key),
          isActive: item.key === viewType,
          icon: item.icon,
        })))(),
      }
    ]
  }

  const elSortBy = ARR_SORTING_OPTIONS.find((item) => item.key === sortBy)?.title;

  return (
    <div className={ styles.sidebarViewTypeContextMenu }>
      <ContextMenu options={contextMenuOptions}>
        <button>
          <span>{ elSortBy }</span>
          <IconList />
        </button>
      </ContextMenu>
    </div>
  )
}

export default SidebarViewTypeContextMenu;
