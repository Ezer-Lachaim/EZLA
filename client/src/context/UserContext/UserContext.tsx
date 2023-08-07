import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
  const [didFinishUserInit, setDidFinishUserInit] = useState(false);
  const location = useLocation();

  const { data: activeRide } = useQuery({
    queryKey: ['getActiveRideForUser'],
    queryFn: async () => {
      const res = await api.ride.getActiveRideForUser();
      return res;
    },
    refetchInterval: 5000
  });
  const values = useMemo(() => ({ user, setUser, activeRide }), [user, activeRide]);
  const getCurrentUser = async () => {
    try {
      const userResponse = await api.user.getCurrentUser();
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
