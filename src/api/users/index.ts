import axios from "axios";
import { IUser } from "../../types/user";
import { IPlaylist } from "../../types/playlist";

interface IGetUserRequest { userId: string; }
interface IGetUserResponse extends IUser {}
interface IGetUserPlaylistsRequest { userId: string }
interface IGetUserPlaylistsResponse {
  total: number;
  offset: number;
  items: IPlaylist[];
}


export const users = {
  getUser: async ({ userId }: IGetUserRequest): Promise<IGetUserResponse> => {
    const { data } = await axios.get<IGetUserResponse>(`/users/${userId}`)
    return data;
  },

  getUserPlaylists: async ({ userId }: IGetUserPlaylistsRequest): Promise<IGetUserPlaylistsResponse> => {
    const { data } = await axios.get<IGetUserPlaylistsResponse>(`/users/${userId}/playlists`)
    return data;
  }
}
