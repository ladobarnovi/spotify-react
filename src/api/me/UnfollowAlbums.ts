import axios from "axios";

interface IUnfollowAlbumsRequest {
  arrAlbumIds: string[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
 */
export async function UnfollowAlbums({ arrAlbumIds }: IUnfollowAlbumsRequest): Promise<void> {
  await axios.delete("/me/albums", {
    data: {
      ids: arrAlbumIds.join(","),
    }
  });
}