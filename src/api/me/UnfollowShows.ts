import axios from "axios";

interface IUnfollowShowRequest {
  arrShowIds: string[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/remove-shows-user
 */
export async function UnfollowShows({ arrShowIds }: IUnfollowShowRequest) {
  await axios.delete(`/me/shows/`, {
    data: {
      ids: arrShowIds.join(","),
    }
  });
}