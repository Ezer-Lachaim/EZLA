import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext/UserContext.tsx';
import { RideStateEnum, User, UserRoleEnum, UserRegistrationStateEnum } from '../../api-client';
import { getGuestToken } from '../../Config.ts';

const useNavigateUser = () => {
  const { user, activeRide } = useUserContext();

  const navigate = useNavigate();

  const navigateOnUser = (explicitUser: User | undefined = undefined) => {
    const actualUser = explicitUser || user;

    if (actualUser?.registrationState === UserRegistrationStateEnum.Pending) {
      navigate('/processing-user');
      return;
    }

    if (actualUser && actualUser.registrationState !== UserRegistrationStateEnum.Approved) {
      navigate('/logout');
      return;
    }

    if (actualUser?.isInitialPassword) {
      navigate('/create-password');
      return;
    }

    if (actualUser?.role === UserRoleEnum.Admin) {
      navigate('/backoffice');
      return;
    }

    if (actualUser?.role === UserRoleEnum.Driver) {
      if (activeRide) {
        if (
          activeRide.state === RideStateEnum.Booked ||
          activeRide.state === RideStateEnum.DriverArrived ||
          activeRide.state === RideStateEnum.RequesterCanceled
        ) {
          navigate('/driver/active');
          return;
        }
        if (activeRide.state === RideStateEnum.Riding) {
          navigate('/driver/riding');
          return;
        }
        if (activeRide.state === RideStateEnum.Completed) {
          navigate('/driver/completed');
          return;
        }
      }

      navigate('/driver/rides');
      return;
    }

    if (actualUser?.role === UserRoleEnum.Requester || (!actualUser && getGuestToken())) {
      if (activeRide) {
        if (activeRide.state === RideStateEnum.Canceled) {
          navigate('/passenger/order-ride');
          return;
        }
        if (activeRide.state === RideStateEnum.WaitingForDriver) {
          navigate('/passenger/searching-driver');
          return;
        }
        if (activeRide.state === RideStateEnum.DriverArrived) {
          navigate('/passenger/driver-arrived');
          return;
        }
        if (
          activeRide.state === RideStateEnum.Booked ||
          activeRide.state === RideStateEnum.DriverCanceled
        ) {
          navigate('/passenger/active');
          return;
        }
        if (activeRide.state === RideStateEnum.Riding) {
          navigate('/passenger/riding');
          return;
        }
        if (activeRide.state === RideStateEnum.Completed) {
          navigate('/passenger/completed');
          return;
        }
      }

      navigate('/passenger/order-ride');
      return;
    }

    if (window.location.pathname === '/') {
      navigate('/first-signup');
      return;
    }

    // if user is approved but is neither admin, driver nor requester, then it's an error
    if (actualUser) {
      navigate('/404');
    }
  };

  return { navigateOnUser };
};

export default useNavigateUser;
