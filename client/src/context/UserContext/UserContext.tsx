import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../api-client';
import { api, getToken, setToken } from '../../Config';

const UserContext = createContext({} as { user: User | null; setUser: (user: User) => void });

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [didFinishUserInit, setDidFinishUserInit] = useState(false);
  const navigate = useNavigate();

  const values = useMemo(() => ({ user, setUser }), [user]);
  const getCurrentUser = async () => {
    try {
      const userResponse = await api.user.getCurrentUser();
      setUser(userResponse);
      if (userResponse.role === 'Admin') {
        navigate('/backoffice');
      }
    } catch (error) {
      setToken(null);
    } finally {
      setDidFinishUserInit(true);
    }
  };
  useEffect(() => {
    if (getToken() && !user) {
      getCurrentUser();
    } else {
      setDidFinishUserInit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!didFinishUserInit) return null;

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
