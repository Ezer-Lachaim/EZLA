/* eslint-disable import/no-mutable-exports */
import { Configuration, DriverApi, HospitalApi, RideApi, UserApi, EnvApi } from './api-client';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || '';
export const POLLING_INTERVAL = 3000;

export const getToken = () => {
  return currentToken || localStorage.getItem('token');
};

export const getGuestToken = () => {
  return localStorage.getItem('guestToken');
};

const getApiConfiguration = () => {
  const headers: { token?: string; ['guest-token']?: string } = {};

  const token = getToken() || '';
  if (token) {
    headers.token = token;
  } else {
    const guestToken = getGuestToken() || '';
    if (guestToken) {
      headers['guest-token'] = guestToken;
    }
  }

  return new Configuration({
    basePath: BASE_API_URL,
    headers
  });
};

const createApi = () => {
  const configuration = getApiConfiguration();
  return {
    user: new UserApi(configuration),
    ride: new RideApi(configuration),
    hospital: new HospitalApi(configuration),
    driver: new DriverApi(configuration),
    env: new EnvApi(configuration)
  };
};

let currentToken: string | null;

export let api = createApi();

export const setToken = (token: string | null) => {
  localStorage.setItem('token', token || '');
  currentToken = token;
  api = createApi();
};

export const setGuestToken = (token: string) => {
  localStorage.setItem('guestToken', token);
  api = createApi();
};

export const clearGuestToken = () => {
  localStorage.removeItem('guestToken');
  api = createApi();
};
