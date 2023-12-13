import { create } from 'zustand';
import { api, addPreMiddleware, addPostMiddleware } from './api';
import { User } from '../api-client';

const TOKEN_LOCAL_STORAGE_KEY = 'token';
const GUEST_TOKEN_LOCAL_STORAGE_KEY = 'guestToken';

type AuthStore = {
  token: string | null;
  guestToken: string | null;
  user: User | null;
  isUserInitiated: boolean;
  setToken: (token: string | null, user?: User | null) => void;
  setUser: (user: User | null) => void;
  setGuestToken: (guestToken: string | null) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || null,
  guestToken: localStorage.getItem(GUEST_TOKEN_LOCAL_STORAGE_KEY) || null,
  user: null,
  isUserInitiated: false,
  setToken: (token, user) => {
    set({ token });

    if (token) {
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
      get().setUser(user ?? null);
    } else {
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      get().setUser(null);
    }
  },
  setUser: (user) => {
    set({ user, isUserInitiated: true });
  },
  setGuestToken: (guestToken) => {
    set({ guestToken });

    if (guestToken) {
      localStorage.setItem(GUEST_TOKEN_LOCAL_STORAGE_KEY, guestToken);
    } else {
      localStorage.removeItem(GUEST_TOKEN_LOCAL_STORAGE_KEY);
    }
  }
}));

export function initAuthMiddlewares() {
  // add token header to all api requests
  addPreMiddleware(async (params) => {
    const headers = (params?.init?.headers || {}) as HeadersInit & {
      token?: string;
      ['guest-token']?: string;
    };
    const authStoreState = useAuthStore.getState();

    const token = authStoreState.token || '';
    if (token) {
      headers.token = token;
    } else {
      const guestToken = authStoreState.guestToken || '';
      if (guestToken) {
        headers['guest-token'] = guestToken;
      }
    }

    return {
      ...params,
      init: {
        ...params?.init,
        headers
      }
    };
  });

  // empty the token in case of an unauthorized status
  addPostMiddleware(async (context) => {
    if (context.response.status === 401) {
      useAuthStore.getState().setToken(null); // user will be set to null automatically
    }
  });
}

export async function initUser() {
  const { token, setUser } = useAuthStore.getState();

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
