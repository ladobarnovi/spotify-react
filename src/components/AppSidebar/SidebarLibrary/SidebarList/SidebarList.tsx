import styles from "./SidebarList.module.scss";
import { useEffect, useState } from "react";
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import SidebarViewTypeContextMenu, {
  ESortingOptions,
  EViewOptions
} from "components/AppSidebar/SidebarLibrary/SidebarViewTypeContextMenu/SidebarViewTypeContextMenu";
import SidebarCompactView from "components/AppSidebar/SidebarLibrary/SidebarList/SidebarCompactView/SidebarCompactView";
import SidebarListView from "components/AppSidebar/SidebarLibrary/SidebarList/SidebarListView/SidebarListView";
import SidebarGridView from "components/AppSidebar/SidebarLibrary/SidebarList/SidebarGridView/SidebarGridView";
import { useScroll } from "hooks/useScroll";
import EntitySearchInput from "../EntitySearchInput/EntitySearchInput";
import { useSidebarContext } from "context/SidebarContext";

interface IProps {
  filterBy: string | null;
}

function SidebarList({ filterBy }: IProps) {
  const { refScrollbar } = useScroll();
  const { arrLibrary } = useSidebarContext();
  const [ arrFilteredEntities, setArrFilteredEntities ] = useState<(IPlaylist | IAlbum | IArtist)[]>([]);
  const [ viewType, setViewType ] = useState(EViewOptions.list);
  const [ sortBy, setSortBy ] = useState(ESortingOptions.recent);

  useEffect(() => {
    if (filterBy == null) {
      return setArrFilteredEntities(arrLibrary);
    }

    const arrFiltered = arrLibrary.filter((item) => item.type === filterBy);
    setArrFilteredEntities(arrFiltered);
  }, [ filterBy, arrLibrary ]);

  const elView = (() => {
    if (viewType === EViewOptions.list) {
      return <SidebarListView arrData={arrFilteredEntities} />;
    }
    else if (viewType === EViewOptions.compact) {
      return <SidebarCompactView arrData={arrFilteredEntities} />;
    }
    else if (viewType === EViewOptions.grid) {
      return <SidebarGridView arrData={arrFilteredEntities} />;
    }

    return null;
  })()

  return (
    <div className={styles.sidebarList}>
      <div ref={refScrollbar}>
        <div className={styles.scrollContent}>
          <div className={styles.header}>
            <div className={styles.searchContainer}>
              <EntitySearchInput />
            </div>
            <SidebarViewTypeContextMenu
              onViewTypeChanged={setViewType}
              onSortingChanged={setSortBy}
            />
          </div>
          <div className={styles.items}>
            { elView }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarList;
