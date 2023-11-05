import { create } from 'zustand';
import { addPreMiddleware, addPostMiddleware } from './api';

const TOKEN_LOCAL_STORAGE_KEY = 'token';

type AuthStore = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
    }

    set({ token });
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
