import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Ride, User } from '../../api-client';
import { POLLING_INTERVAL, api, getGuestToken, getToken, setToken } from '../../Config';

const UserContext = createContext(
  {} as {
    user: User | null;
    setUser: (user: User | null) => void;
    activeRide: Ride | null | undefined;
  }
);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [didFinishUserInit, setDidFinishUserInit] = useState(false);
  const [hasGuestToken, setHasGuestToken] = useState(false);

  useEffect(() => {
    // this is a temporary solution until auth context is merged in
    const intervalId = setInterval(() => {
      setHasGuestToken(!!getGuestToken());
    }, 300);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const { data: activeRide } = useQuery({
    queryKey: ['getActiveRideForUser'],
    enabled: !!user || hasGuestToken,
    queryFn: async () => {
      try {
        const guestToken = getGuestToken() || '';
        return await api.ride.getActiveRideForUser({ guestToken });
      } catch (e) {
        return null;
      }
    },
    refetchInterval: POLLING_INTERVAL
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

  if (!didFinishUserInit) return null;

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
