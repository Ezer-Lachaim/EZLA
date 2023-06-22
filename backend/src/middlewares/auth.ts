import { NextFunction, Response } from 'express';
import { getAuthConfigAdmin } from '../utils/firebase-config';
import { CustomRequest } from './CustomRequest';

export const authHandler = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (isSignupRoute(req)) {
    next();
  }

  const token = req.get('token');

  if (token) {
    getAuthConfigAdmin()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.token = decodedToken;
        next();
      })
      .catch((error) => {
        console.log(error);
        res.status(401).send({ error: 'User is not authorized' });
      });
  }
};
function isSignupRoute(req: CustomRequest) {
  return req.url.includes('users') && req.method === 'POST';
}
