import styles from "./SidebarList.module.scss";
import { useEffect, useRef, useState } from "react";
import { OverlayScrollbars } from "overlayscrollbars";
import { IPlaylist } from "types/playlist";
import { useEntityFetch } from "hooks/useEntityFetch";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { useDispatch } from "react-redux";
import { setFollowedEntityIds } from "store/user/userSlice";
import SidebarViewTypeContextMenu, {
  ESortingOptions,
  EViewOptions
} from "components/AppSidebar/SidebarLibrary/SidebarViewTypeContextMenu/SidebarViewTypeContextMenu";
import SidebarCompactView from "components/AppSidebar/SidebarLibrary/SidebarList/SidebarCompactView/SidebarCompactView";
import SidebarListView from "components/AppSidebar/SidebarLibrary/SidebarList/SidebarListView/SidebarListView";
import SidebarGridView from "components/AppSidebar/SidebarLibrary/SidebarList/SidebarGridView/SidebarGridView";

interface IProps {
  filterBy: string | null;
}

function SidebarList({ filterBy }: IProps) {
  const dispatch = useDispatch();
  const scrollbarRef = useRef(null);
  const { fetchAllPlaylists, fetchAllAlbums, fetchAllArtist } = useEntityFetch();
  const [ arrAllEntities, setArrAllEntities ] = useState<(IPlaylist | IAlbum | IArtist)[]>([])
  const [ arrFilteredEntities, setArrFilteredEntities ] = useState<(IPlaylist | IAlbum | IArtist)[]>([]);
  const [ viewType, setViewType ] = useState(EViewOptions.list);
  const [ sortBy, setSortBy ] = useState(ESortingOptions.recent);

  useEffect(() => {
    if (scrollbarRef.current) {
      OverlayScrollbars(scrollbarRef.current, {
        scrollbars: {
          autoHide: 'scroll',
        },
      });
    }
  }, []);

  useEffect(() => {
    fetchList()
  }, [ ])

  useEffect(() => {
    if (filterBy == null) {
      setArrFilteredEntities(arrAllEntities);
    }
    else {
      const arrFiltered = arrAllEntities.filter((item) => item.type === filterBy);
      setArrFilteredEntities(arrFiltered);
    }
  }, [ filterBy ]);

  async function fetchList(): Promise<void> {
    const [ arrAlbums, arrPlaylists, arrArtists ] = await Promise.all([ fetchAllAlbums(), fetchAllPlaylists(), fetchAllArtist() ]);

    const arrAll = [ ...arrAlbums, ...arrPlaylists, ...arrArtists];

    dispatch(setFollowedEntityIds(arrAll.map((item) => item.id)));

    setArrAllEntities(arrAll);
    setArrFilteredEntities([ ...arrAlbums, ...arrPlaylists, ...arrArtists]);
  }

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
    <div className={ styles.sidebarList }>
      <div ref={ scrollbarRef }>
        <div className={styles.scrollContent}>
          <div className={styles.header}>
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
