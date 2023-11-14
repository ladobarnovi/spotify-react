import styles from "./SidebarList.module.scss";
import { useRef, useEffect, useState } from "react";
import { OverlayScrollbars } from "overlayscrollbars";
import { IPlaylist } from "types/playlist";
import { useEntityFetch } from "hooks/useEntityFetch";
import { IAlbum } from "types/album";
import PlaylistListItem from "components/EntityListItems/PlaylistListItem/PlaylistListItem";
import { IArtist } from "types/artist";

interface IProps {
  filterBy: string | null;
}

function SidebarList({ filterBy }: IProps) {
  const scrollbarRef = useRef(null);
  const { fetchAllPlaylists, fetchAllAlbums, fetchAllArtist } = useEntityFetch();
  const [ arrAllEntities, setArrAllEntities ] = useState<(IPlaylist | IAlbum | IArtist)[]>([])
  const [ arrFilteredEntities, setArrFilteredEntities ] = useState<(IPlaylist | IAlbum | IArtist)[]>([]);

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

    setArrAllEntities([ ...arrAlbums, ...arrPlaylists, ...arrArtists]);
    setArrFilteredEntities([ ...arrAlbums, ...arrPlaylists, ...arrArtists]);
  }

  const items = arrFilteredEntities.map((item) => (
    <PlaylistListItem data={ item } key={ item.id } />
  ));

  return (
    <div className={ styles.sidebarList }>
      <div ref={ scrollbarRef }>
        <div className={styles.scrollContent}>
          { items }
        </div>
      </div>
    </div>
  )
}

export default SidebarList;
