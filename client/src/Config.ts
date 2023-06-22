/* eslint-disable import/no-mutable-exports */
import { Configuration, UserApi } from './api-client/index.ts';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:8080';

export const getToken = () => currentToken;

const createUserApi = () => {
  return new UserApi(
    new Configuration({
      basePath: BASE_API_URL,
      headers: {
        token: getToken() || ''
      }
    })
  );
};

let currentToken: string | null = localStorage.getItem('token');

export let userAPI = createUserApi();

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
  currentToken = token;
  userAPI = createUserApi();
};
