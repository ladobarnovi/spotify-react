import axios from "axios";
import { IPlaylist } from "types/playlist";

interface IPlaylistBaseRequest {
  playlistId: string;
}

interface IFetchPlaylistRequest extends IPlaylistBaseRequest { }

interface IEditPlaylistRequest extends IPlaylistBaseRequest {
  name: string;
  description: string | undefined;
}

interface IAddTrackToPlaylistRequest extends IPlaylistBaseRequest {
  trackUri: string;
}

interface IRemoveTrackFromPlaylistRequest extends IPlaylistBaseRequest {
  trackUri: string;
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
  },

  followPlaylist: async ({ playlistId }: IPlaylistBaseRequest): Promise<void> => {
    await axios.put(`/playlists/${playlistId}/followers`)
  },

  unfollowPlaylist: async ({ playlistId }: IPlaylistBaseRequest): Promise<void> => {
    await axios.delete(`/playlists/${playlistId}/followers`)
  },

  addTrackToPlaylist: async ({ playlistId, trackUri }: IAddTrackToPlaylistRequest): Promise<void> => {
    await axios.post(`/playlists/${playlistId}/tracks`, {
      uris: [ trackUri ],
      position: 0,
    })
  },

  removeTrackFromPlaylist: async ({ playlistId, trackUri }: IRemoveTrackFromPlaylistRequest): Promise<void> => {
    await axios.delete(`/playlists/${playlistId}/tracks`, {
      data: {
        tracks: [{
          uri: trackUri
        }],
      }
    })
  }
};
