import axios from "axios";
import { IAlbum } from "types/album";
import { ITrack } from "types/track";
import { IArtist } from "types/artist";
import { IPlaylist } from "types/playlist";

interface ISearchRequest {
  q: string;
  type?: string;
}

interface ISearchResponse {
  albums: {
    items: IAlbum[];
  };
  tracks: {
    items: ITrack[];
  };
  artists: {
    items: IArtist[];
  };
  playlists: {
    items: IPlaylist[];
  }
  shows: {
    // items: Podcast[];
  };
}

export const search = {
  search: async ({ q, type = "album,track,artist,show,playlist,episode" }: ISearchRequest): Promise<ISearchResponse> => {
    const { data } = await axios.get("/search", {
      params: {
        q,
        type,
      }
    });

    return data;
  }
}
