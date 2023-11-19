import axios from "axios";
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { IUser } from "types/user";

interface IAlbumsRequest {
  limit?: number;
  offset?: number;
  market?: string;
}

interface IAlbumsResponse {
  href: string;
  items: {
    album: IAlbum
  }[];
  total: number;
}

interface IPlaylistsParams {
  limit?: number;
  offset?: number;
}

interface IPlaylistResponse {
  href: string;
  items: IPlaylist[];
  total: number;
}

type TFollowingType = "artist";

interface IFollowingParams {
  type: TFollowingType;
  after?: string | null;
  limit?: number;
}

interface IFollowingResponse {
  artists: {
    items: IArtist[];
    total: number;
  }
}

interface IFollowAlbumRequest {
  albumId: string;
}

interface IUnfollowAlbumRequest {
  albumId: string;
}

interface IFollowArtistRequest {
  artistId: string;
}

interface IUnfollowArtistRequest {
  artistId: string;
}

interface IUserResponse extends IUser { }

export const me = {
  user: async (): Promise<IUserResponse> => {
    const { data } = await axios.get("/me");

    return data;
  },

  // https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
  albums: async (params: IAlbumsRequest): Promise<IAlbumsResponse> => {
    const { data } = await axios.get("/me/albums", {
      params
    });

    return data;
  },

  // https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
  playlists: async (params: IPlaylistsParams): Promise<IPlaylistResponse> => {
    const { data } = await axios.get<IPlaylistResponse>("/me/playlists", {
      params
    });

    return data;
  },

  // https://developer.spotify.com/documentation/web-api/reference/get-followed
  following: async (params: IFollowingParams): Promise<IFollowingResponse> => {
    const { data } = await axios.get<IFollowingResponse>("/me/following", {
      params
    });

    return data;
  },

  // https://developer.spotify.com/documentation/web-api/reference/save-albums-user
  followAlbum: async ({ albumId }: IFollowAlbumRequest): Promise<void> => {
    await axios.put("/me/albums", {
      ids: [ albumId ],
    });
  },

  // https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
  unfollowAlbum: async ({ albumId }: IUnfollowAlbumRequest): Promise<void> => {
    await axios.delete("/me/albums", {
      data: {
        ids: [ albumId ]
      }
    });
  },

  // https://developer.spotify.com/documentation/web-api/reference/follow-artists-users
  followArtist: async ({ artistId }: IFollowArtistRequest): Promise<void> => {
    await axios.put("/me/following?type=artist", {
      ids: [ artistId ]
    })
  },

  unfollowArtist: async ({ artistId }: IUnfollowArtistRequest): Promise<void> => {
    await axios.delete("/me/following?type=artist", {
      data: {
        ids: [ artistId ]
      }
    })
  }
}
