import { useQuery } from '@tanstack/react-query';
import { useAuthState } from './firebase';
import { api, POLLING_INTERVAL } from '../services/api';

export function useActiveRide() {
  const [user] = useAuthState();

  const {
    data: activeRide,
    isFetching,
    refetch: reFetch
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

  return {
    activeRide: activeRide ?? null,
    isFetching,
    reFetch
  };
}
