import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export default function useServerEnvSettings() {
  const { data: settings } = useQuery({
    queryKey: ['getEnvSettings'],
    staleTime: Infinity,
    queryFn: async () => {
      try {
        return await api.env.getEnvSettings();
      } catch (e) {
        return null;
      }
    }
  });

  return settings;
}
