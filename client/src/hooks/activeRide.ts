import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../services/auth/user';
import { useStore as useGuestAuthStore } from '../services/auth/guest';
import { api, POLLING_INTERVAL } from '../services/api';

export function useActiveRide() {
  const user = useUserStore((state) => state.user);
  const guestToken = useGuestAuthStore((state) => state.token);

  const {
    data: activeRide,
    isFetching,
    refetch: reFetch
  } = useQuery({
    queryKey: ['getActiveRideForUser'],
    enabled: !!user || !!guestToken,
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
