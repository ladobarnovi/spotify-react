import axios from "axios";

interface IFollowAlbumsRequest {
  arrAlbumIds: string[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/save-albums-user
 */
export async function FollowAlbums({ arrAlbumIds }: IFollowAlbumsRequest): Promise<void> {
  await axios.put("/me/albums", {
    ids: arrAlbumIds.join(","),
  });
}