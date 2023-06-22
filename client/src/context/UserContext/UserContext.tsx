import { createContext, useContext, useMemo, useState } from 'react';
import { User } from '../../api-client';

const UserContext = createContext({} as { user: User | null; setUser: (user: User) => void });

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const values = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
