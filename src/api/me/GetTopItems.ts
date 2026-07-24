import axios from "axios";
import { IArtist } from "types/artist";
import { ITrack } from "types/track";

interface IGetTopItemsRequest {
  type: "artists" | "tracks"
}

interface IGetTopItemsResponse { 
    items: ITrack[] | IArtist[]
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export async function GetTopItems({ type }: IGetTopItemsRequest): Promise<IGetTopItemsResponse> {
  const { data } = await axios.get(`/me/top/${type}`);

  return data
}