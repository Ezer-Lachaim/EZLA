// import express from 'express';
import { NextFunction, Response, Request } from 'express';

const unickToken = 'a12345678';
// Middleware to check token
export default function checkTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const { token } = req.body;
  if (token === unickToken) {
    next();
  } else {
    res.status(401).json('Unauthorized: Token missing or incorrect');
  }
}
