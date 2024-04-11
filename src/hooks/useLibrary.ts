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
  const { isAuthorized, user } = useAuth();
  const [ arrAllEntities, setArrAllEntities ] = useState<(IPlaylist | IAlbum | IArtist)[]>(arrSavedEntities)

  const { fetchAllAlbums, fetchAllArtist, fetchAllPlaylists } = useEntityFetch();
  const dispatch = useDispatch();

  async function fetch(): Promise<void> {
    if (!isAuthorized) return;

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
    // arrSavedEntities = arrAll;

    // const liked: IPlaylist = {
    //   id: "",
    //   uri: "",
    //   description: "",
    //   href: "",
    //   external_urls: {
    //     spotify: "",
    //   },
    //   images: [
    //     {
    //       url: "https://misc.scdn.co/liked-songs/liked-songs-640.png",
    //       height: 640,
    //       width: 640
    //     }
    //   ],
    //   name: "Liked Songs",
    //   owner: {
    //     id: user!.id,
    //     display_name: user!.display_name
    //   },
    //   type: "playlist",
    //   tracks: {
    //     href: "",
    //     items: [],
    //     total: 0,
    //   },
    // }
    // arrAll.unshift(liked);

    // return arrAll;
  }

  // const { data } = useQuery<(IPlaylist | IAlbum | IArtist)[]>({
  //   queryKey: [ "fetchUserSavedEntities" ],
  //   queryFn: fetch,
  // });

  useEffect(() => {
    fetch();
  }, [ isAuthorized ]);

  // const arrAllEntities = data || [  ];

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
