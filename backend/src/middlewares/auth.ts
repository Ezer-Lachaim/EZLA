import { NextFunction, Request, Response } from "express";
import { getAuthConfigAdmin } from "../utils/firebase-config"

export const authHandler = (req: Request, res: Response, next: NextFunction): void => {
    console.log('IMMMMM INNN');
    getAuthConfigAdmin().verifyIdToken(req.body.idToken).then((decodedToken) => {
        const uid = decodedToken.uid;
        next();
      })
      .catch((error) => {
        res.status(401).send({error:'User is not authorized'});
      });
};