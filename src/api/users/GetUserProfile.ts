import axios from "axios";
import { IUser } from "../../types/user";

interface IGetUserProfileRequest { userId: string; }

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-users-profile
 */
export async function GetUserProfile({ userId }: IGetUserProfileRequest): Promise<IUser> {
  const { data } = await axios.get<IUser>(`/users/${userId}`)
  return data;
}