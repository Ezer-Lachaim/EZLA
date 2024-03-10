import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Settings } from '../api-client';

const QUERY_KEY = 'settings';

export default function useSettings() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      try {
        return await api.settings.settingsGet();
      } catch (e) {
        return null;
      }
    }
  });

  const setSettings = (updatedSettings: Settings) => {
    queryClient.setQueryData([QUERY_KEY], updatedSettings);
  };

  return { settings, isLoading, setSettings };
}
