import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../api";
import { IUser } from "../types/user";
import { redirectToAuth as redirectToAuthUtil } from "utils/auth";
import { hasAccessToken, getAccessToken } from "utils/tokenStorage";
import { setAxiosToken } from "utils/axios";

interface IAuthContext {
  user: IUser | undefined;
  isLoading: boolean;
  isError: boolean;
  redirectToAuth: () => void;
  onAuthenticated: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext not defined");
  }
  return context;
};

interface IProps {
  children: ReactNode;
}
export function AuthProvider({ children }: IProps) {
  const [hasToken, setHasToken] = useState(() => hasAccessToken());

  useEffect(() => {
    if (hasToken) {
      setAxiosToken(getAccessToken() ?? "");
    }
  }, [hasToken]);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: async () => await api.me.GetProfile(),
    enabled: hasToken,
  });

  function onAuthenticated(): void {
    setHasToken(true);
  }

  const value: IAuthContext = {
    user,
    isLoading,
    isError,
    redirectToAuth: redirectToAuthUtil,
    onAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
