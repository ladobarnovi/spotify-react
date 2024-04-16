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
import { useLibrary } from "hooks/useLibrary";
import { useScroll } from "hooks/useScroll";
import { useSearchContext } from "../../../../context/SearchContext";

interface IProps {
  filterBy: string | null;
}

function SidebarList({ filterBy }: IProps) {
  const { keyword, setKeyword } = useSearchContext();
  const { refScrollbar } = useScroll();
  const { arrAllEntities } = useLibrary();
  const [ arrFilteredEntities, setArrFilteredEntities ] = useState<(IPlaylist | IAlbum | IArtist)[]>([]);
  const [ viewType, setViewType ] = useState(EViewOptions.list);
  const [ sortBy, setSortBy ] = useState(ESortingOptions.recent);

  useEffect(() => {
    console.log(refScrollbar)
  }, [ refScrollbar ]);

  useEffect(() => {
    if (filterBy == null) {
      return setArrFilteredEntities(arrAllEntities);
    }

    const arrFiltered = arrAllEntities.filter((item) => item.type === filterBy);
    setArrFilteredEntities(arrFiltered);
  }, [ filterBy, arrAllEntities ]);

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
            <input type="text" onInput={(e) => setKeyword(e.currentTarget.value)} />
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
