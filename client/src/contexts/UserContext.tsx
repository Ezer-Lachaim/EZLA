import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAuthStore } from '../services/auth';
import { api, POLLING_INTERVAL } from '../services/api';
import { Ride, User } from '../api-client';

const UserContext = createContext(
  {} as {
    user: User | null;
    setUser: (user: User | null) => void;
    activeRide: Ride | null | undefined;
    isFetchingActiveRide: boolean;
    reFetchActiveRide: () => Promise<UseQueryResult>;
  }
);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);
  const [user, setUser] = useState<User | null>(null);
  const [didFinishUserInit, setDidFinishUserInit] = useState(false);

  const {
    data: activeRide,
    isFetching: isFetchingActiveRide,
    refetch: reFetchActiveRide
  } = useQuery({
    queryKey: ['getActiveRideForUser'],
    enabled: !!user,
    queryFn: async () => {
      try {
        return await api.ride.getActiveRideForUser();
      } catch (e) {
        return null;
      }
    },
    refetchInterval: POLLING_INTERVAL
  });
  const values = useMemo(
    () => ({
      user,
      setUser,
      activeRide,
      isFetchingActiveRide,
      reFetchActiveRide
    }),
    [user, activeRide, isFetchingActiveRide, reFetchActiveRide]
  );
  const getCurrentUser = async () => {
    try {
      const userResponse = await api.user.getCurrentUser();
      setUser(userResponse);
    } catch (error) {
      setToken(null); // user will be set to null automatically
    } finally {
      setDidFinishUserInit(true);
    }
  };

  useEffect(() => {
    if (token && !user) {
      getCurrentUser();
    } else {
      setDidFinishUserInit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // make sure to reset the user once the token is reset
    if (!token && user) {
      setUser(null);
    }
  }, [token, user]);

  if (!didFinishUserInit) return null;

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
