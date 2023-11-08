import { useQuery } from '@tanstack/react-query';
import { api, POLLING_INTERVAL } from '../services/api';
import { useAuthStore } from '../services/auth';

export function useActiveRide() {
  const token = useAuthStore((state) => state.token);

  const {
    data: activeRide,
    isFetching,
    refetch: reFetch
  } = useQuery({
    queryKey: ['getActiveRideForUser'],
    enabled: !!token,
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
