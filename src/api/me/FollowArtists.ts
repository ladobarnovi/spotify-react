import axios from "axios";

interface IFollowArtistsRequest {
  arrArtistIds: string[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/follow-artists-users
 */
export async function FollowArtists({ arrArtistIds }: IFollowArtistsRequest): Promise<void> {
  await axios.put("/me/following?type=artist", {
    ids: arrArtistIds.join(",")
  })
}