/* eslint-disable import/no-mutable-exports */
import { Configuration, DriverApi, HospitalApi, RideApi, UserApi } from './api-client/index.ts';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || '';
export const POLLING_INTERVAL = 3000;

export const getToken = () => currentToken || localStorage.getItem('token');

const getApiConfiguration = () => {
  return new Configuration({
    basePath: BASE_API_URL,
    headers: {
      token: getToken() || ''
    }
  });
};

const createApi = () => {
  const configuration = getApiConfiguration();
  return {
    user: new UserApi(configuration),
    ride: new RideApi(configuration),
    hospital: new HospitalApi(configuration),
    driver: new DriverApi(configuration)
  };
};

let currentToken: string | null;

export let api = createApi();

export const setToken = (token: string | null) => {
  localStorage.setItem('token', token || '');
  currentToken = token;
  api = createApi();
};

export const getGuestToken = () => {
  return localStorage.getItem('rideToken');
};
