import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthContextValues = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext({} as AuthContextValues);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const values = useMemo(
    (): AuthContextValues => ({
      token,
      setToken
    }),
    [token]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
