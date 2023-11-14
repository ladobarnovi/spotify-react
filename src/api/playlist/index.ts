import axios from "axios";
import { IPlaylist } from "types/playlist";

interface IFetchPlaylistRequest {
  playlistId: string;
}

interface IEditPlaylistRequest {
  playlistId: string;
  name: string;
  description: string | undefined;
}

interface IFetchPlaylistResponse extends IPlaylist { }



export const playlist = {
  fetchPlaylist: async (payload: IFetchPlaylistRequest): Promise<IFetchPlaylistResponse> => {
    const { data } = await axios.get(`/playlists/${payload.playlistId}`)

    return data;
  },

  editPlaylist: async (payload: IEditPlaylistRequest): Promise<any> => {
    const { data } = await axios.put(`/playlists/${payload.playlistId}`, {
      name: payload.name,
      description: payload.description,
    })

    return data;
  }
};
