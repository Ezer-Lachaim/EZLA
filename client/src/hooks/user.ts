import { useEffect, useState } from 'react';
import { fetchUser, useUserStore } from '../services/user';
import { useAuthState } from './firebase';

export function useInitUser() {
  const isUserInitiated = useUserStore((state) => state.isUserInitiated);
  const [, loadingAuth] = useAuthState();
  const [initiationStarted, setInitiationStarted] = useState(false);

  useEffect(() => {
    if (!initiationStarted && !loadingAuth) {
      setInitiationStarted(true);
      fetchUser();
    }
  }, [initiationStarted, loadingAuth]);

  return initiationStarted && isUserInitiated;
}
