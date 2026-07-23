import axios from "axios";

interface IFollowShowRequest {
  arrShowIds: string[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/save-shows-user
 */
export async function FollowShows({ arrShowIds }: IFollowShowRequest) {
  await axios.put(`/me/shows/`, {
    ids: arrShowIds.join(","),
  });
}