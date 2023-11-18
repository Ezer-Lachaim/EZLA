import { Response } from 'express';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Driver } from '../models/driver';
import { RideRequester } from '../models/ride-requester';
import { getAuthConfig } from '../utils/firebase-config';
import { CustomRequest } from '../middlewares/CustomRequest';
import { User, UserRegistrationStateEnum, UserRoleEnum } from '../models/user';
import { createUser } from '../repository/user';

const auth = getAuthConfig();

export const initDevData = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const adminRecord = await createUserWithEmailAndPassword(auth, 'admin@test.com', 'Admin*1');
    const user = {} as User;
    user.userId = adminRecord.user.uid;
    user.role = UserRoleEnum.Admin;
    user.firstName = 'Admin';
    user.lastName = 'Admin';
    user.isInitialPassword = false;
    user.registrationState = UserRegistrationStateEnum.Approved;
    user.signupDate = new Date();
    await createUser(adminRecord.user.uid, user);

    const driverRecord = await createUserWithEmailAndPassword(auth, 'driver@test.com', 'Driver*1');
    const driver = {} as Driver;
    driver.userId = driverRecord.user.uid;
    driver.role = UserRoleEnum.Driver;
    driver.isInitialPassword = false;
    driver.firstName = 'נהג';
    driver.lastName = 'טסט';
    driver.nationalId = '123456789';
    driver.city = 'tel-aviv';
    driver.cellPhone = '0501234567';
    driver.email = 'a@a.com';
    driver.volunteeringArea = 'center district';
    driver.isValidLicense = true;
    driver.isValidCarLicense = true;
    driver.carManufacturer = 'hyundai';
    driver.carModel = 'i20';
    driver.carColor = 'white';
    driver.carPlateNumber = '1122233';
    driver.numOfSeats = 5;
    driver.registrationState = UserRegistrationStateEnum.Approved;
    driver.signupDate = new Date();
    driver.numOfDrives = 0;
    driver.carCapabilities = ['WheelChair', 'BabyChair'];
    await createUser(driverRecord.user.uid, driver);

    const requesterRecord = await createUserWithEmailAndPassword(
      auth,
      'requester@test.com',
      'Requester*1'
    );
    const requester = {} as RideRequester;
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
