import { NextFunction, Response } from 'express';
import { verifyJwt } from '../utils/jwt-util';
import { getUserByUid } from '../repository/user';
import { getAuthConfigAdmin } from '../utils/firebase-config';
import { CustomRequest } from './CustomRequest';

export const authHandler = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (isSignupRoute(req) || isLoginRoute(req)) {
    next();
    return;
  }

  const token = req.get('token');

  if (token) {
    getAuthConfigAdmin()
      .verifyIdToken(token)
      .then(async (decodedToken) => {
        req.token = decodedToken;
        console.log(decodedToken.uid);
        req.user = await getUserByUid(decodedToken.uid);
        console.log(JSON.stringify(req.user));
        next();
      })
      .catch(async (error) => {
        try {
          const localToken = verifyJwt(token);
          req.localToken = localToken;
          req.user = await getUserByUid(localToken.body.toJSON().uid.toString());
          if (!localToken) {
            console.log(error);
            res.status(401).send({ error: 'User is not authorized' });
          } else {
            next();
          }
        } catch(e) {
          res.status(401).send({ error: 'User is not authorized' });
        }
      });
  } else {
    res.status(401).send({ error: 'User is not authorized' });
  }
};
function isSignupRoute(req: CustomRequest) {
  return req.url.includes('users') && req.method === 'POST';
}

function isLoginRoute(req: CustomRequest) {
  return req.url.includes('users/login') && req.method === 'POST';
}
