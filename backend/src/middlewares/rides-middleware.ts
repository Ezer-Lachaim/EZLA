import { NextFunction, Response } from 'express';
import { UserRoleEnum } from '../models/user';
import { CustomRequest } from './CustomRequest';

export const ridesHandler = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const user = req.user;
    if (user.role === UserRoleEnum.Admin || user.role === UserRoleEnum.Driver) {
        next();
    } else {
        res.status(401).send();
    }
};
