import { create } from 'zustand';
import { api } from './api';
import { getAuthUserToken, onAuthStateChanged } from './firebase';
import { User } from '../api-client';

type UserStore = {
  user: User | null;
  isUserInitiated: boolean;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isUserInitiated: false,
  setUser: (user) => {
    set({ user, isUserInitiated: true });
  }
}));

// automatically empty the user when logged out
onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    return;
  }

  const { setUser, isUserInitiated } = useUserStore.getState();
  if (isUserInitiated) {
    setUser(null);
  }
});

export async function fetchUser() {
  const { setUser } = useUserStore.getState();

  // await for token to be initiated
  const token = await getAuthUserToken();

  // then set the user
  if (!token) {
    setUser(null);
    return;
  }

  try {
    setUser(await api.user.getCurrentUser());
  } catch (e) {
    setUser(null);
  }
}
