import { Response } from 'express';
import { UserRegistrationStateEnum, UserRoleEnum } from '../models/user';
import { CustomRequest } from '../middlewares/CustomRequest';
import { createUser } from '../repository/user';
import { firebase, getAuthConfig } from '../utils/firebase-config';

const auth = getAuthConfig();

export const create = async (req: CustomRequest, res: Response): Promise<void> => {
  const userRole = req.user.role;
  const driverPayload = req.body;

  if (userRole === UserRoleEnum.Admin) {
    try {
      const userRecord = await firebase.createUserWithEmailAndPassword(
        auth,
        driverPayload.email,
        driverPayload.password
      );
      driverPayload.userId = userRecord.user.uid;
      driverPayload.role = UserRoleEnum.Driver;
      driverPayload.isInitialPassword = true;
      driverPayload.registrationState = UserRegistrationStateEnum.Approved;
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
