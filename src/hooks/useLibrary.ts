import { useEntityFetch } from "hooks/useEntityFetch";
import { useEffect, useState } from "react";
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { setFollowedEntityIds } from "store/user/userSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth";
import { useQuery } from "react-query";

let arrSavedEntities: (IPlaylist | IAlbum | IArtist)[] = [];

export function useLibrary() {
  const { isAuthorized } = useAuth();
  // const [ arrAllEntities, setArrAllEntities ] = useState<(IPlaylist | IAlbum | IArtist)[]>(arrSavedEntities)

  const { fetchAllAlbums, fetchAllArtist, fetchAllPlaylists } = useEntityFetch();
  const dispatch = useDispatch();

  async function fetch(): Promise<(IPlaylist | IAlbum | IArtist)[]> {
    if (!isAuthorized) return [];

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

    // setArrAllEntities(arrAll);
    arrSavedEntities = arrAll;

    return arrAll;
  }

  const { data } = useQuery<(IPlaylist | IAlbum | IArtist)[]>({
    queryKey: [ "fetchUserSavedEntities" ],
    queryFn: fetch,
  });

  const arrAllEntities = data || [  ];

  // useEffect(() => {
  //   if (arrSavedEntities.length === 0) {
  //     fetch();
  //   }
  // }, [ isAuthorized ]);

  return {
    arrAllEntities,
    fetch,
  }
}
