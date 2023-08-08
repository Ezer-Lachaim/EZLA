import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext/UserContext.tsx';
import { RideStateEnum, User, UserRoleEnum } from '../../api-client';

const useNavigateUser = () => {
  const { user, activeRide } = useUserContext();

  useEffect(() => {
    navigateOnRefresh();
  }, [activeRide?.state]);
  const navigate = useNavigate();

  const navigateAfterLogin = (explicitUser: User | undefined = undefined) => {
    const actualUser = explicitUser || user;

    if (actualUser?.isInitialPassword) {
      return navigate('/create-password');
    }
    if (actualUser?.role === 'Admin') {
      return navigate('/backoffice');
    }
    if (actualUser?.role === UserRoleEnum.Driver) {
      if (activeRide) {
        if (
          activeRide.state === RideStateEnum.Booked ||
          activeRide.state === RideStateEnum.DriverArrived ||
          activeRide.state === RideStateEnum.RequesterCanceled
        ) {
          return navigate('/driver/active');
        }
        if (activeRide.state === RideStateEnum.Riding) {
          return navigate('/driver/riding');
        }
        if (activeRide.state === RideStateEnum.Completed) {
          return navigate('/driver/completed');
        }
      }
      return navigate('/driver/rides');
    }
    if (actualUser?.role === UserRoleEnum.Requester) {
      if (activeRide) {
        if (
          activeRide.state === RideStateEnum.WaitingForDriver ||
          activeRide.state === RideStateEnum.Canceled
        ) {
          return navigate('/passenger/order-ride');
        }
        if (activeRide.state === RideStateEnum.DriverArrived) {
          return navigate('/passenger/driver-arrived');
        }
        if (
          activeRide.state === RideStateEnum.Booked ||
          activeRide.state === RideStateEnum.DriverCanceled
        ) {
          return navigate('/passenger/active');
        }
        if (activeRide.state === RideStateEnum.Riding) {
          return navigate('/passenger/riding');
        }
        if (activeRide.state === RideStateEnum.Completed) {
          return navigate('/passenger/completed');
        }
      }
      return navigate('/passenger/order-ride');
    }
    // If user is neither admin, driver nor requester, then it's an error
    return navigate('404');
  };

  const navigateOnRefresh = () => {
    if (user?.registrationState === 'Pending') {
      navigate('/processing-user');
    } else if (user?.registrationState === 'Approved') {
      navigateAfterLogin();
    } else {
      navigate(window.location.pathname !== '/' ? window.location.pathname : '/login');
    }
  };

  return { navigateAfterLogin, navigateOnRefresh };
};

export default useNavigateUser;
