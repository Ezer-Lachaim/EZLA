import { Response } from 'express';
import { subscribeToNewRideNotification, updateUserPassword } from '../utils/firebase';
import { User, UserRegistrationStateEnum, UserRoleEnum } from '../models/user';
import {
  createUser,
  getAllUsers,
  updateFcmToken,
  updateIsInitialPass,
  updateUserByUid
} from '../repository/user';
import { CustomRequest } from '../middlewares/CustomRequest';

/**
 * GET /
 * Home page.
 */
export const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const isAdmin = req.user.role === UserRoleEnum.Admin;
    if (isAdmin) {
      try {
        res.send(await getAllUsers(req.query.state?.toString(), req.query.role?.toString()));
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

export const registerFcmToken = async (req: CustomRequest, res: Response): Promise<void> => {
  const { fcmToken } = req.body;
  try {
    if (!fcmToken) {
      res.status(400).send({ error: 'fcmToken not provided' });
    }
    await updateFcmToken(req.user.userId, fcmToken);

    if (req.user.role === UserRoleEnum.Driver) {
      await subscribeToNewRideNotification(fcmToken);
    }

    res.status(200).send();
  } catch (e) {
    console.log(e);
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

export const createRequester = async (req: CustomRequest, res: Response): Promise<void> => {
  const { user }: { user: User } = req.body;

  try {
    user.userId = req.token.uid;
    user.email = req.token.email;
    user.role = UserRoleEnum.Requester;
    user.isInitialPassword = true;
    user.registrationState = UserRegistrationStateEnum.Pending;
    user.signupDate = new Date();
    await createUser(req.token.uid, user);
    res.send({ user });
  } catch (e) {
    console.log('Something went wrong %s', e);
    res.status(400).send(e);
  }
};

export const updateUserInitialPassword = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const userIdFromToken = req.user.userId;
  const userIdFromQuery = req.params.userId;

  if (userIdFromQuery === userIdFromToken && req.user.isInitialPassword) {
    if (req.user.registrationState !== UserRegistrationStateEnum.Approved) {
      res.status(401).send({ error: 'User is not approved!' });
    } else {
      try {
        if (req.body.password) {
          const newPassword = req.body.password;
          await updateUserPassword(req.user.userId, newPassword);
          await updateIsInitialPass(req.user.userId, false);
          res.status(202).send();
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
