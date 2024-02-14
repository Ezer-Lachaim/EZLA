import { Response } from 'express'; // this controller is used to handle the new driver form
import { UserRoleEnum, UserRegistrationStateEnum } from '../models/user';
import { CustomRequest } from '../middlewares/CustomRequest';
import { createUser } from '../repository/user';
import { createUser as createFirebaseUser } from '../utils/firebase';

export const create = async (req: CustomRequest, res: Response): Promise<void> => {
  const driverPayload = req.body;
  console.log('🚀 ~ create ~ driverInfo 1:', driverPayload);

  try {
    const userRecord = await createFirebaseUser(
      driverPayload.email,
      String(driverPayload.nationalId)
    );
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
};
