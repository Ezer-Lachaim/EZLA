import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import njwt from 'njwt';
import { User } from '../models/user';

export interface CustomRequest extends Request {
  token: DecodedIdToken;
  localToken: njwt.Jwt;
  user: User;
}
