/* eslint-disable import/no-mutable-exports */
import { Configuration, DriverApi, HospitalApi, RideApi, UserApi } from './api-client';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || '';
export const POLLING_INTERVAL = 3000;

let currentToken: string | null;
export const getToken = () => currentToken || localStorage.getItem('token');

export const setToken = (token: string | null) => {
  currentToken = token || '';
  localStorage.setItem('token', currentToken);
  api = createApi();
};

// initialize currentToken
currentToken = getToken();

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

// initialize api
export let api = createApi();
