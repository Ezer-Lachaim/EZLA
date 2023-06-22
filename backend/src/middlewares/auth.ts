import { NextFunction, Request, Response } from "express";
import { getAuthConfigAdmin } from "../utils/firebase-config"

export const authHandler = (req: Request, res: Response, next: NextFunction): void => {

    if (req.url.includes('users/login')) {
      next();
      return;
    }

    const token = req.get('token');

    if (token) {
      getAuthConfigAdmin().verifyIdToken(token).then((decodedToken) => {
        const uid = decodedToken.uid;
        next();
      })
      .catch((error) => {
        res.status(401).send({error:'User is not authorized'});
      });
    }
    
    res.status(401).send({error:'User is not authorized'});
};