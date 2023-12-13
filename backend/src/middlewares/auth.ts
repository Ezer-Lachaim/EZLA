import { NextFunction, Response } from 'express';
import config from '../config';
import { getUserByUid } from '../repository/user';
import { getAuthConfigAdmin } from '../utils/firebase';
import { CustomRequest } from './CustomRequest';
import { UserRegistrationStateEnum, UserRoleEnum } from '../models/user';

const userRoleEnumValues = Object.values(UserRoleEnum);

export function authHandler(allowGuestToken?: boolean) {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.get('token');
    if (!token) {
      if (isGuestToken(req, allowGuestToken)) {
        next();
        return;
      }

      notAuthorizedResp(res);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        const decodedToken = await getAuthConfigAdmin().verifyIdToken(token);

        req.token = decodedToken;
        console.log(decodedToken.uid);

        // in create user route only the token will exist, the user hasn't been saved yet
        if (!isCreateUserRoute(req)) {
          req.user = await getUserByUid(decodedToken.uid);
          console.log(JSON.stringify(req.user));

          if (!validateUserRole(req, res)) {
            return;
          }
        }

        next();
      } catch (error) {
        console.log(error);
        notAuthorizedResp(res);
      }
    })();
  };
}

function isCreateUserRoute(req: CustomRequest) {
  return req.baseUrl === '/users' && req.path === '/' && req.method === 'POST';
}

function validateUserRole(req: CustomRequest, res: Response): boolean {
  if (!userRoleEnumValues.includes(req.user.role)) {
    notAuthorizedResp(res);
    return false;
  }

  if (
    req.user.role === UserRoleEnum.Requester &&
    req.user.registrationState !== UserRegistrationStateEnum.Approved &&
    !isGetMeUserRoute(req)
  ) {
    notAuthorizedResp(res, 'User status is not approved');
    return false;
  }

  return true;
}

function isGetMeUserRoute(req: CustomRequest) {
  let { path } = req;
  // remove trailing slash
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  return req.baseUrl === '/users' && path === '/me' && req.method === 'GET';
}

function notAuthorizedResp(res: Response, error?: string) {
  res.status(401).send({ error: error ?? 'User is not authorized' });
}

function isGuestToken(req: CustomRequest, allowGuestToken?: boolean) {
  if (!allowGuestToken || !config.allowGuestRideMode) {
    return false;
  }

  return !!req.get('guest-token');
}
