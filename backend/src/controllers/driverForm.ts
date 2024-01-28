// this controller is used to handle the new driver form
import { Response } from 'express';
import { CustomRequest } from '../middlewares/CustomRequest';
import { UserRoleEnum, UserRegistrationStateEnum } from '../models/user';
import { createUser } from '../repository/user';
import { firebase, getAuthConfig } from '../utils/firebase';

const auth = getAuthConfig();

export const create = async (req: CustomRequest, res: Response): Promise<void> => {
  // const userRole = req.user.role;
  const driverPayload = req.body;
  console.log('🚀 ~ create ~ driverInfo 1:', driverPayload);

  try {
    const userRecord = await firebase.createUserWithEmailAndPassword(
      auth,
      driverPayload.email,
      driverPayload.nationalId
    );
    driverPayload.userId = userRecord.user.uid;
    driverPayload.role = UserRoleEnum.Driver;
    driverPayload.isInitialPassword = true;
    driverPayload.registrationState = UserRegistrationStateEnum.Approved;
    driverPayload.signupDate = new Date();
    driverPayload.numOfDrives = 0;
    console.log('🚀 ~ create ~ driverPayload 2:', driverPayload);
    await createUser(driverPayload.userId, driverPayload);
    res.send({
      driverPayload
    });
  } catch (e) {
    res.status(500).send(e);
  }
};
