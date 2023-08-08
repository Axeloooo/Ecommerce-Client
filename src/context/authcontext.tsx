import {
  createContext,
  useState,
  useEffect,
  useContext,
  Context,
  ReactNode,
} from "react";

import { AuthContextInterface } from "../vite-env";

export const AuthContext: Context<AuthContextInterface> =
  createContext<AuthContextInterface>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    register: () => {},
  });

export function useAuth(): AuthContextInterface {
  return useContext(AuthContext);
}

function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false as boolean);

  useEffect(() => {
    const uid: string | null = localStorage.getItem("uid");
    const cid: string | null = localStorage.getItem("cid");
    if (uid && cid) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleRegister = (email: string, cid: string): void => {
    localStorage.setItem("uid", email);
    localStorage.setItem("cid", cid);
    setIsAuthenticated(true);
  };

  const handleLogin = (email: string, cid: string): void => {
    localStorage.setItem("uid", email);
    localStorage.setItem("cid", cid);
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("uid");
    localStorage.removeItem("cid");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
