import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../api";
import { IUser } from "../types/user";

interface IAuthContext {
  user: IUser | undefined;
  isLoading: boolean;
  isError: boolean;
  redirectToAuth: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext not defined");
  }
  return context;
}

interface IProps {
  children: ReactNode;
}
export function AuthProvider({ children }: IProps) {
  const [ token, setToken ] = useState(localStorage.getItem("token") || null);

  const { data: user, isLoading, isError } = useQuery({
    queryKey: [ "fetchUser", token ],
    queryFn: async () => await api.me.user(),
    enabled: !!token,
  });

  function makeAuthUrl() {
    const clientId = process.env.REACT_APP_CLIENT_ID as string;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL as string;
    const scopes = process.env.REACT_APP_SCOPES as string;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURI(
      redirectUrl
    )}&scope=${encodeURI(scopes)}`;
  }

  function redirectToAuth() {
    window.location.href = makeAuthUrl();
  }

  const value: IAuthContext = {
    user,
    isLoading,
    isError,
    redirectToAuth,
  }

  return (
    <AuthContext.Provider value={value} >
      { children }
    </AuthContext.Provider>
  )
}