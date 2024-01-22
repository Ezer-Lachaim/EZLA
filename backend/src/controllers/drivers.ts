import { Response } from 'express';
import { UserRegistrationStateEnum, UserRoleEnum } from '../models/user';
import { CustomRequest } from '../middlewares/CustomRequest';
import { createUser, getAllUsers, updateUserByUid } from '../repository/user';
import { createUser as createFirebaseUser } from '../utils/firebase';

export const create = async (req: CustomRequest, res: Response): Promise<void> => {
  const userRole = req.user.role;
  const driverPayload = req.body;

  if (userRole === UserRoleEnum.Admin) {
    try {
      const userRecord = await createFirebaseUser(driverPayload.email, driverPayload.nationalId);
      driverPayload.userId = userRecord.uid;
      driverPayload.role = UserRoleEnum.Driver;
      driverPayload.isInitialPassword = true;
      driverPayload.registrationState = UserRegistrationStateEnum.Approved;
      driverPayload.signupDate = new Date();
      driverPayload.numOfDrives = 0;
      await createUser(driverPayload.userId, driverPayload);
      res.send({
        driverPayload
      });
    } catch (e) {
      res.status(500).send(e);
    }
  } else {
    res.status(401).send();
  }
};

export const update = async (req: CustomRequest, res: Response): Promise<void> => {
  const userRole = req.user.role;
  const driverPayload = req.body;

  if (userRole === UserRoleEnum.Admin) {
    try {
      await updateUserByUid(driverPayload.userId, driverPayload);
      res.send({
        driverPayload
      });
    } catch (e) {
      res.status(500).send(e);
    }
  } else {
    res.status(401).send();
  }
};

export const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const isAdmin = req.user.role === UserRoleEnum.Admin;
    if (isAdmin) {
      try {
        res.send(await getAllUsers(undefined, 'Driver'));
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
