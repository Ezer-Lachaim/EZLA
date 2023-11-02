import { ReactNode, createContext, useContext, useMemo } from 'react';
import {
  Configuration,
  ResponseContext,
  DriverApi,
  HospitalApi,
  RideApi,
  UserApi
} from '../api-client';
import { useAuthContext } from './AuthContext';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || '';
export const POLLING_INTERVAL = 3000;

type ApiContextValues = {
  driver: DriverApi;
  hospital: HospitalApi;
  user: UserApi;
  ride: RideApi;
};

const ApiContext = createContext({} as ApiContextValues);

export const ApiContextProvider = ({ children }: { children: ReactNode }) => {
  const { token, setToken } = useAuthContext();

  const values = useMemo(() => generateApi(token, setToken), [token, setToken]);
  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

export const useApiContext = () => {
  return useContext(ApiContext);
};

function generateApiConfiguration(token: string | null, setToken: (token: null) => void) {
  return new Configuration({
    basePath: BASE_API_URL,
    headers: {
      token: token || ''
    },
    /* eslint-disable prettier/prettier */
    middleware: [{
      async post(context: ResponseContext): Promise<void> {
        // empty the token in case of an unauthorized status
        if (context.response.status === 401) {
          setToken(null); // user will be set to null automatically
        }
      }
    }]
    /* eslint-enable prettier/prettier */
  });
}

function generateApi(token: string | null, setToken: (token: null) => void): ApiContextValues {
  const configuration = generateApiConfiguration(token, setToken);

  return {
    user: new UserApi(configuration),
    ride: new RideApi(configuration),
    hospital: new HospitalApi(configuration),
    driver: new DriverApi(configuration)
  };
}
