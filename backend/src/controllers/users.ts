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
  try {
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
  } catch (error) {
    res.status(500).send();
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
  try {
    const userRecord = await firebase.signInWithEmailAndPassword(auth, email, password);
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
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: 'wrong username or password' });
  }
};

export const signup = async (req: CustomRequest, res: Response): Promise<void> => {
  const user: User = req.body;
  const generatedPass = generator.generate({
    length: 20,
    numbers: true
  });
  try {
    const userRecord = await firebase.createUserWithEmailAndPassword(
      auth,
      user.email,
      generatedPass
    );
    user.userId = userRecord.user.uid;
    user.role = UserRoleEnum.Requester;
    user.isInitialPassword = true;
    user.registrationState = UserRegistrationStateEnum.Pending;
    await createUser(userRecord.user.uid, user);
    res.send({ token: createJwt({ email: user.email, uid: userRecord.user.uid }), user });
  } catch (e) {
    console.log('Something went wrong %s', e);
    res.status(400).send(e);
  }
};

export const updateUserWithTempToken = async (req: CustomRequest, res: Response): Promise<void> => {
  const userIdFromToken = req.user.userId;
  const userIdFromQuery = req.params.userId;
  if (userIdFromQuery === userIdFromToken && req.localToken && req.user.isInitialPassword) {
    if (req.user.registrationState !== UserRegistrationStateEnum.Approved) {
      res.status(401).send({ error: 'User is not approved!' });
    } else {
      try {
        if (req.body.user.password) {
          const newPassword = req.body.user.password;
          await updateUserPassword(req.user.userId, newPassword);
          await updateIsInitialPass(req.user.userId, false);
          const userRecord = await firebase.signInWithEmailAndPassword(
            auth,
            req.user.email,
            newPassword
          );
          res.status(202).send({ token: await userRecord.user.getIdToken() });
        } else {
          res.status(400).send({ error: 'Missing password' });
        }
      } catch (e) {
        console.log(e);
        res.status(500).send();
      }
    }
  } else {
    res.status(401).send();
  }
};

export const updateUserFromBO = async (req: CustomRequest, res: Response): Promise<void> => {
  const userIdFromQuery = req.params.userId;
  try {
    if (req.user.role !== UserRoleEnum.Admin) {
      res.status(401).send();
    } else {
      // Admin flow
      await updateUserByUid(userIdFromQuery, req.body);
      res.status(200).send(req.body);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
