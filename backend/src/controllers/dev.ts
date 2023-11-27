import { Response } from 'express';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Driver } from '../models/driver';
import { RideRequester } from '../models/ride-requester';
import { getAuthConfig } from '../utils/firebase';
import { CustomRequest } from '../middlewares/CustomRequest';
import { User, UserRegistrationStateEnum, UserRoleEnum } from '../models/user';
import { createUser } from '../repository/user';

const auth = getAuthConfig();

export const initDevData = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user = {} as User;
    user.email = 'admin@test.com';
    const adminRecord = await createUserWithEmailAndPassword(auth, user.email, 'Admin*1');
    user.userId = adminRecord.user.uid;
    user.role = UserRoleEnum.Admin;
    user.firstName = 'Admin';
    user.lastName = 'Admin';
    user.isInitialPassword = false;
    user.registrationState = UserRegistrationStateEnum.Approved;
    user.signupDate = new Date();
    await createUser(adminRecord.user.uid, user);

    const driver = {} as Driver;
    driver.email = 'driver@test.com';
    const driverRecord = await createUserWithEmailAndPassword(auth, driver.email, 'Driver*1');
    driver.userId = driverRecord.user.uid;
    driver.role = UserRoleEnum.Driver;
    driver.isInitialPassword = false;
    driver.firstName = 'נהג';
    driver.lastName = 'טסט';
    driver.registrationState = UserRegistrationStateEnum.Approved;
    driver.signupDate = new Date();
    driver.numOfDrives = 0;
    await createUser(driverRecord.user.uid, driver);

    const requester = {} as RideRequester;
    requester.email = 'requester@test.com';
    const requesterRecord = await createUserWithEmailAndPassword(
      auth,
      requester.email,
      'Requester*1'
    );
    requester.userId = requesterRecord.user.uid;
    requester.role = UserRoleEnum.Requester;
    requester.firstName = 'נוסע';
    requester.lastName = 'טסט';
    requester.isInitialPassword = false;
    requester.registrationState = UserRegistrationStateEnum.Approved;
    requester.signupDate = new Date();
    await createUser(requesterRecord.user.uid, requester);
    res.status(200).send('Data init finished successfully!');
  } catch (e) {
    res.status(500).send();
  }
};
