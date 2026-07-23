import { IAlbum } from "types/album";
import { ITrack } from "types/track";
import { IArtist } from "types/artist";
import { IPlaylist } from "types/playlist";
import { IEpisode, IPodcast } from "types/podcast";
import axios from "axios";

interface ISearchItemsRequest {
  q: string;
  type?: string;
}

interface ISearchItemsResponse {
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
  };
  shows: {
    items: IPodcast[];
  };
  episodes: {
    items: IEpisode[];
  }
}

export async function SearchItems({ q, type = "album,track,artist,show,playlist,episode" }: ISearchItemsRequest): Promise<ISearchItemsResponse> {
  const { data } = await axios.get("/search", {
    params: {
      q,
      type,
    }
  });

  return data;
}