import { addPreMiddleware, addPostMiddleware } from '../api';
import { getToken as getAuthUserToken, signOut } from './user';
import { getToken as getAuthGuestToken } from './guest';

export function initApiMiddlewares() {
  // add token header to all api requests
  addPreMiddleware(async (params) => {
    const headers = (params?.init?.headers || {}) as HeadersInit & {
      token?: string;
      ['guest-token']?: string;
    };

    const token = (await getAuthUserToken()) || '';
    if (token) {
      headers.token = token;
    } else {
      const guestToken = getAuthGuestToken() || '';
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
      await signOut();
    }
  });
}
