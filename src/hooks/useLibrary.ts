import { useEntityFetch } from "hooks/useEntityFetch";
import { useEffect, useState } from "react";
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { setFollowedEntityIds } from "store/user/userSlice";
import { useDispatch } from "react-redux";

let arrSavedEntities: (IPlaylist | IAlbum | IArtist)[] = [];

export function useLibrary() {
  const [ arrAllEntities, setArrAllEntities ] = useState<(IPlaylist | IAlbum | IArtist)[]>(arrSavedEntities)

  const { fetchAllAlbums, fetchAllArtist, fetchAllPlaylists } = useEntityFetch();
  const dispatch = useDispatch();

  async function fetch(): Promise<void> {
    const [ arrAlbums, arrPlaylists, arrArtists ] = await Promise.all([
      fetchAllAlbums(),
      fetchAllPlaylists(),
      fetchAllArtist(),
    ]);

    const arrAll = [
      ...arrAlbums,
      ...arrPlaylists,
      ...arrArtists
    ];

    dispatch(setFollowedEntityIds(arrAll.map((item) => item.id)));

    setArrAllEntities(arrAll);
    arrSavedEntities = arrAll;
  }

  useEffect(() => {
    if (arrSavedEntities.length === 0) {
      fetch();
    }
  }, [ ]);

  return {
    arrAllEntities,
    fetch,
  }
}
