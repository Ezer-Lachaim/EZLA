import { create } from 'zustand';
import { api, addPreMiddleware, addPostMiddleware } from './api';
import { User } from '../api-client';

const TOKEN_LOCAL_STORAGE_KEY = 'token';

type AuthStore = {
  token: string | null;
  user: User | null;
  isUserInitiated: boolean;
  setToken: (token: string | null, user?: User | null) => void;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || null,
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
  }
}));

export function initAuthMiddlewares() {
  // add token header to all api requests
  addPreMiddleware(async (params) => {
    return {
      ...params,
      init: {
        ...params?.init,
        headers: {
          ...params.init.headers,
          token: useAuthStore.getState().token || ''
        }
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
