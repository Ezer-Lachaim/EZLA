import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Ride, User } from '../../api-client';
import { api, getToken, setToken } from '../../Config';

const UserContext = createContext(
  {} as {
    user: User | null;
    setUser: (user: User) => void;
    activeRide: Ride | null;
    setActiveRide: (ride: Ride | null) => void;
  }
);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);
  const [didFinishUserInit, setDidFinishUserInit] = useState(false);
  const location = useLocation();

  const values = useMemo(() => ({ user, setUser, activeRide, setActiveRide }), [user, activeRide]);
  const getCurrentUser = async () => {
    try {
      let activeRideResponse = null;
      try {
        activeRideResponse = await api.ride.getActiveRideForUser();
      } catch (error) {}
      const userResponse = await api.user.getCurrentUser();
      setActiveRide(activeRideResponse);
      setUser(userResponse);
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

  useEffect(() => {
    if (didFinishUserInit) {
      (async () => {
        try {
          const activeRideResponse = await api.ride.getActiveRideForUser();
          setActiveRide(activeRideResponse);
        } catch (error) {}
      })();
    }
  }, [location]);

  if (!didFinishUserInit) return null;

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
