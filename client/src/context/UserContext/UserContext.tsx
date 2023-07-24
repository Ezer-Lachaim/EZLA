import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Ride, User } from '../../api-client';
import { api, getToken, setToken } from '../../Config';

const UserContext = createContext(
  {} as { user: User | null; setUser: (user: User) => void; activeRide: Ride | null }
);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);
  const [didFinishUserInit, setDidFinishUserInit] = useState(false);

  const values = useMemo(() => ({ user, setUser, activeRide }), [user]);
  const getCurrentUser = async () => {
    try {
      const userResponse = await api.user.getCurrentUser();
      const activeRideResponse = await api.ride.getActiveRideForUser();
      setUser(userResponse);
      setActiveRide(activeRideResponse);
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
