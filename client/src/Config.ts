/* eslint-disable import/no-mutable-exports */
import { Configuration, HospitalApi, RideApi, UserApi } from './api-client/index.ts';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || '';

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
    hospital: new HospitalApi(configuration)
  };
};

let currentToken: string | null;

export let api = createApi();

export const setToken = (token: string | null) => {
  localStorage.setItem('token', token || '');
  currentToken = token;
  api = createApi();
};
