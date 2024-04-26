import axios from "axios";
import { IUser } from "types/user";

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 */
export async function GetProfile(): Promise<IUser> {
  const { data } = await axios.get<IUser>("/me");
  return data;
}