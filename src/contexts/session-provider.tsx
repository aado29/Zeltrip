import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';
import { User } from '@/interfaces/user';
import Store from '@/services/store';

interface SessionContextProps {
  isLoggedIn?: boolean;
  user?: User;
  accessToken?: string;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
}

interface SessionProviderProps {
  children: ReactNode;
}

const SessionContext = createContext<SessionContextProps>({
  login: (): void | null => null,
  logout: (): void | null => null,
});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }: SessionProviderProps): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (currentUser: User, currentAccessToken: string): void => {
    setIsLoggedIn(true);
    setUser(currentUser);
    setAccessToken(currentAccessToken);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setAccessToken(null);
  };

  useEffect(() => {
    const currentAccessToken = Store.getUserToken();

    if (currentAccessToken) {
      setAccessToken(currentAccessToken);
    }

    const currentUser = Store.getUser();
    if (currentUser) {
      setUser(currentUser);
    }

    if (currentAccessToken && currentUser) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    Store.setUser(user);

    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    Store.setUserToken(accessToken);
  }, [accessToken]);

  const values = useMemo(
    () => ({
      isLoggedIn,
      user,
      accessToken,
      login,
      logout,
    }),
    [isLoggedIn, user, accessToken]
  );

  return <SessionContext.Provider value={values}>{children}</SessionContext.Provider>;
};
