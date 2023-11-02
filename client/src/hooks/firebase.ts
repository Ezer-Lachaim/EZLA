import { useEffect } from 'react';
import { initFirebaseCloudMessaging, setNotificationsToken } from '../services/firebase';
import { useApiContext } from '../contexts/ApiContext';

export function useInitFirebaseCloudMessaging() {
  useEffect(() => {
    const timerId = setTimeout(() => {
      initFirebaseCloudMessaging();
    }, 2 * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);
}

export function useSetNotificationsToken() {
  const api = useApiContext();

  return () => {
    return setNotificationsToken(api.user);
  };
}
