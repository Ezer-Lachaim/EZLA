import { create } from 'zustand';

const GUEST_TOKEN_LOCAL_STORAGE_KEY = 'guestToken';

type GuestAuthStore = {
  token: string | null;
  setToken: (guestToken: string | null) => void;
};

export const useStore = create<GuestAuthStore>((set) => ({
  token: localStorage.getItem(GUEST_TOKEN_LOCAL_STORAGE_KEY) || null,
  setToken: (guestToken) => {
    set({ token: guestToken });

    if (guestToken) {
      localStorage.setItem(GUEST_TOKEN_LOCAL_STORAGE_KEY, guestToken);
    } else {
      localStorage.removeItem(GUEST_TOKEN_LOCAL_STORAGE_KEY);
    }
  }
}));

export function getToken() {
  return useStore.getState().token;
}

export function setToken(guestToken: string | null) {
  useStore.getState().setToken(guestToken);
}
