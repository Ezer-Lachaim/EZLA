import { Response } from 'express';
import { firebase, getAuthConfig } from '../utils/firebase-config';
import { User, UserRoleEnum } from '../models/user';
import { create } from '../repository/user';
import { CustomRequest } from '../middlewares/CustomRequest';

/**
 * GET /
 * Home page.
 */
const auth = getAuthConfig();
export const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  console.log(`TOKEN:${req.token}`);
  res.send([]);
};

export const get = async (req: CustomRequest, res: Response): Promise<void> => {
  console.log(`TOKEN:${req.token}`);
  res.send({});
};

export const deleteOne = async (req: CustomRequest, res: Response): Promise<void> => {
  console.log(`TOKEN:${req.token}`);
  res.send({ hello: 'world' });
};

export const login = async (req: CustomRequest, res: Response): Promise<void> => {
  const { email } = req.body;
  const { password } = req.body;
  firebase
    .signInWithEmailAndPassword(auth, email, password)
    .then((userRecord) => {
      res.send(userRecord);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const signup = async (req: CustomRequest, res: Response): Promise<void> => {
  const user: User = req.body;
  firebase
    .createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async (userRecord) => {
      user.userId = userRecord.user.uid;
      user.role = UserRoleEnum.Requester;
      await create(userRecord.user.uid, user);
      res.send(userRecord);
    })
    .catch((error) => {
      console.log('Something went wrong %s', error);
      res.status(400).send(error);
    });
};
