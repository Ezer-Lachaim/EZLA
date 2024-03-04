import {
  Configuration,
  ResponseContext,
  DriverApi,
  HospitalApi,
  RideApi,
  UserApi,
  EnvApi,
  RequestContext,
  FetchParams,
  SettingsApi
} from '../api-client';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || '';
export const POLLING_INTERVAL = 3000;

type PreMiddleware = (params: FetchParams) => Promise<FetchParams | void>;
type PostMiddleware = (context: ResponseContext) => Promise<void>;

const preMiddlewares: PreMiddleware[] = [];
const postMiddlewares: PostMiddleware[] = [];

const configuration = new Configuration({
  basePath: BASE_API_URL,
  middleware: [
    {
      async pre(context: RequestContext): Promise<FetchParams | void> {
        let params = { url: context.url, init: context.init };
        // eslint-disable-next-line no-restricted-syntax
        for (const middleware of preMiddlewares) {
          // eslint-disable-next-line no-await-in-loop
          params = (await middleware(params)) || params;
        }
        return params;
      },
      async post(context: ResponseContext): Promise<void> {
        // eslint-disable-next-line no-restricted-syntax
        for (const middleware of postMiddlewares) {
          // eslint-disable-next-line no-await-in-loop
          await middleware(context);
        }
      }
    }
  ]
});

export const api = {
  user: new UserApi(configuration),
  ride: new RideApi(configuration),
  hospital: new HospitalApi(configuration),
  driver: new DriverApi(configuration),
  settings: new SettingsApi(configuration),
  env: new EnvApi(configuration)
};

export function addPreMiddleware(...middleware: PreMiddleware[]) {
  preMiddlewares.push(...middleware);
}

export function addPostMiddleware(...middleware: PostMiddleware[]) {
  postMiddlewares.push(...middleware);
}

export function removePreMiddleware(...middleware: PreMiddleware[]) {
  removeMiddleware(preMiddlewares, middleware);
}

export function removePostMiddleware(...middleware: PostMiddleware[]) {
  removeMiddleware(postMiddlewares, middleware);
}

function removeMiddleware(
  fromList: PostMiddleware[] | PreMiddleware[],
  removeList: PostMiddleware[] | PreMiddleware[]
) {
  // eslint-disable-next-line no-plusplus
  for (let i = fromList.length - 1; i >= 0; i--) {
    // eslint-disable-next-line no-restricted-syntax
    for (const middleware of removeList) {
      if (fromList[i] === middleware) {
        fromList.splice(i, 1);
      }
    }
  }
}
