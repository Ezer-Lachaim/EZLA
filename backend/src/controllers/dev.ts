import { Response } from 'express';
import { Driver } from '../models/driver';
import { RideRequester } from '../models/ride-requester';
import { createUser as createFirebaseUser } from '../utils/firebase';
import { CustomRequest } from '../middlewares/CustomRequest';
import { User, UserRegistrationStateEnum, UserRoleEnum } from '../models/user';
import { createUser } from '../repository/user';

export const initDevData = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user = {} as User;
    user.email = 'admin@test.com';
    const adminRecord = await createFirebaseUser(user.email, 'Admin*1');
    user.userId = adminRecord.uid;
    user.role = UserRoleEnum.Admin;
    user.firstName = 'Admin';
    user.lastName = 'Admin';
    user.isInitialPassword = false;
    user.registrationState = UserRegistrationStateEnum.Approved;
    user.signupDate = new Date();
    await createUser(adminRecord.uid, user);

    const driver = {} as Driver;
    driver.email = 'driver@test.com';
    const driverRecord = await createFirebaseUser(driver.email, 'Driver*1');
    driver.userId = driverRecord.uid;
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
    await createUser(driverRecord.uid, driver);

    const requester = {} as RideRequester;
    requester.email = 'requester@test.com';
    const requesterRecord = await createFirebaseUser(requester.email, 'Requester*1');
    requester.userId = requesterRecord.uid;
    requester.role = UserRoleEnum.Requester;
    requester.firstName = 'נוסע';
    requester.lastName = 'טסט';
    requester.isInitialPassword = false;
    requester.registrationState = UserRegistrationStateEnum.Approved;
    requester.signupDate = new Date();
    await createUser(requesterRecord.uid, requester);
    res.status(200).send('Data init finished successfully!');
  } catch (e) {
    res.status(500).send();
  }
};
