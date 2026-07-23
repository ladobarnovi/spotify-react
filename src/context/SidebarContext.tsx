import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { IPlaylist } from "../types/playlist";
import { IAlbum } from "../types/album";
import { IArtist } from "../types/artist";
import { setFollowedEntityIds } from "../store/user/userSlice";
import { useEntityFetch } from "../hooks/useEntityFetch";
import { useDispatch } from "react-redux";

interface ISidebarContext {
  arrLibrary: (IPlaylist | IAlbum | IArtist)[];
}

export const SidebarContext = createContext<ISidebarContext | null>(null);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context) throw new Error("useSidebarContext must be used within SidebarContext");

  return context;
}

interface IProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: IProps) {
  const { user } = useAuth();
  const [ arrLibrary, setArrLibrary ] = useState<(IPlaylist | IAlbum | IArtist)[]>([])

  const { fetchAllAlbums, fetchAllArtist, fetchAllPlaylists } = useEntityFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user) return;

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
      setArrLibrary(arrAll);
    })()
  }, []);

  const value: ISidebarContext = {
    arrLibrary
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}