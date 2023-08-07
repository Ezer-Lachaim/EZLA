import _ from 'lodash';
import { Ride } from '../models/ride';
import { getUserByUid } from './user';

export async function populateRideDetails(ride: Ride) {
  const populatedRide = { ...ride };

  if (ride.rideRequester?.userId) {
    const rideRequesterDetails = await getUserByUid(ride.rideRequester?.userId);
    populatedRide.rideRequester = _.omit(rideRequesterDetails, [
      'nationalId',
      'email',
      'patient',
      'fcmToken',
      'registrationState',
      'isInitialPassword'
    ]);
  }

  if (ride.driver?.userId) {
    const driverDetails = await getUserByUid(ride.driver?.userId);
    populatedRide.driver = _.omit(driverDetails, [
      'nationalId',
      'email',
      'fcmToken',
      'registrationState',
      'isInitialPassword'
    ]);
  }

  return populatedRide;
}
