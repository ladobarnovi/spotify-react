import { api } from "api";
import { IAlbum } from "types/album";
import { IPlaylist } from "types/playlist";
import { IArtist } from "types/artist";

const ENTITY_LIMIT = 50;

export function useEntityFetch() {
  async function fetchAllPlaylists(): Promise<IPlaylist[]> {
    const arrPlaylists: IPlaylist[] = [];
    let offset = 0;

    while (true) {
      const { items, total } = await api.me.playlists({
        limit: ENTITY_LIMIT,
        offset
      });

      offset += ENTITY_LIMIT;
      arrPlaylists.push(...items);

      if (offset > 0) {
        break;
      }
    }

    return arrPlaylists;
  }

  async function fetchAllAlbums(): Promise<IAlbum[]> {
    const arrAlbums: IAlbum[] = [];
    let offset = 0;

    while (true) {
      const { items, total } = await api.me.albums({
        limit: ENTITY_LIMIT,
        offset
      });

      offset += ENTITY_LIMIT;
      arrAlbums.push(...items.map((item) => item.album))

      if (offset > 0) {
        break;
      }
    }

    return arrAlbums;
  }

  async function fetchAllArtist(): Promise<IArtist[]> {
    const arrArtists: IArtist[] = [];
    let after: string | null = null;

    while (true) {
      const { artists: { items } } = await api.me.following({
        type: "artist",
        limit: ENTITY_LIMIT,
        after
      })

      arrArtists.push(...items);
      after = arrArtists[arrArtists.length - 1].id;

      if (items.length < ENTITY_LIMIT) {
        break;
      }
    }

    return arrArtists;
  }

  return {
    fetchAllPlaylists,
    fetchAllAlbums,
    fetchAllArtist,
  }
}
