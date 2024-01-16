import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import { User } from '../models/user';

export interface CustomRequest extends Request {
  token: DecodedIdToken;
  user: User;
}
