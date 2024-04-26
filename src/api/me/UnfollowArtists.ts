import axios from "axios";

interface IUnfollowArtistsRequest {
  arrArtistIds: string[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users
 */
export async function UnfollowArtists({ arrArtistIds }: IUnfollowArtistsRequest): Promise<void> {
  await axios.delete("/me/following?type=artist", {
    data: {
      ids: arrArtistIds.join(",")
    }
  })
}