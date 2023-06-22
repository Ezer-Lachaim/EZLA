/* eslint-disable @typescript-eslint/no-floating-promises */
import { Response } from 'express';
import generator from 'generate-password';
import { firebase, getAuthConfig, updateUserPassword } from '../utils/firebase-config';
import { User, UserRegistrationStateEnum, UserRoleEnum } from '../models/user';
import {
  createUser,
  getAllUsers,
  getUserByUid,
  updateIsInitialPass,
  updateUserByUid
} from '../repository/user';
import { CustomRequest } from '../middlewares/CustomRequest';
import { createJwt } from '../utils/jwt-util';

/**
 * GET /
 * Home page.
 */
const auth = getAuthConfig();
export const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  const isAdmin = req.user.role === UserRoleEnum.Admin;
  if (isAdmin) {
    try {
      res.send(await getAllUsers(req.query.state?.toString()));
    } catch (e) {
      res.status(500).send();
    }
  } else {
    res.status(401).send();
  }
};

export const get = async (req: CustomRequest, res: Response): Promise<void> => {
  res.send(req.user);
};

export const validateStatus = async (req: CustomRequest, res: Response): Promise<void> => {
  res.send({ status: req.user.registrationState });
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
    .then(async (userRecord) => {
      const user: User = await getUserByUid(userRecord.user.uid);
      if (user.role === UserRoleEnum.Requester) {
        if (user.registrationState === UserRegistrationStateEnum.Approved) {
          res.send({ token: await userRecord.user.getIdToken(), user });
        } else {
          res.status(401).send({ error: 'User status is not approved!' });
        }
      } else if (user.role === UserRoleEnum.Admin || user.role === UserRoleEnum.Driver) {
        res.send({ token: await userRecord.user.getIdToken(), user });
      } else {
        res.status(401).send({ error: 'User is not authorized!' });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const signup = async (req: CustomRequest, res: Response): Promise<void> => {
  const user: User = req.body;
  const generatedPass = generator.generate({
    length: 20,
    numbers: true
  });
  firebase
    .createUserWithEmailAndPassword(auth, user.email, generatedPass)
    .then(async (userRecord) => {
      user.userId = userRecord.user.uid;
      user.role = UserRoleEnum.Requester;
      user.isInitialPassword = true;
      user.registrationState = UserRegistrationStateEnum.Pending;
      await createUser(userRecord.user.uid, user);
      res.send({ token: createJwt({ email: user.email, uid: userRecord.user.uid }), user });
    })
    .catch((error) => {
      console.log('Something went wrong %s', error);
      res.status(400).send(error);
    });
};

export const updateUser = async (req: CustomRequest, res: Response): Promise<void> => {
  const userIdFromToken = req.user.userId;
  const userIdFromQuery = req.params.userId;
  console.log(userIdFromToken);
  if (userIdFromQuery && userIdFromToken) {
    if (req.user.role !== UserRoleEnum.Admin) {
      res.status(401).send();
    } else {
      // Admin flow
      await updateUserByUid(userIdFromQuery, req.body);
      res.status(200).send(req.body);
    }
  } else if (userIdFromToken && req.localToken && req.user.isInitialPassword) {
    if (req.user.registrationState !== UserRegistrationStateEnum.Approved) {
      res.status(401).send();
    } else {
      const newPassword = req.body.password;
      await updateUserPassword(req.user.userId, newPassword);
      await updateIsInitialPass(req.user.userId, false);
      firebase
        .signInWithEmailAndPassword(auth, req.user.email, newPassword)
        .then(async (userRecord) => {
          res.status(202).send({ token: await userRecord.user.getIdToken() });
        });
    }
  } else {
    res.status(400).send();
  }
};
