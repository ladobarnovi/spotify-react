import { useSelector } from "react-redux";
import { RootState } from "store";
import { useDispatch } from "react-redux";
import { setIsAuthorized } from "store/auth/authSlice";

export function useAuth() {
  const dispatch = useDispatch();

  const isAuthorized = useSelector((state: RootState) => state.authReducer.isAuthorized);
  const user = useSelector((state: RootState) => state.authReducer.user);

  function setAuthorized(isAuthorized: boolean): void {
    dispatch(setIsAuthorized(isAuthorized));
  }

  function getAuthUrl() {
    const clientId = process.env.REACT_APP_CLIENT_ID as string;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL as string;
    const scopes = process.env.REACT_APP_SCOPES as string;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURI(
      redirectUrl
    )}&scope=${encodeURI(scopes)}`;
  }

  function redirectToAuth() {
    window.location.href = getAuthUrl();
  }

  return {
    isAuthorized,
    setAuthorized,
    getAuthUrl,
    redirectToAuth,
    user,
  };
}
