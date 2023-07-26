import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext/UserContext.tsx';
import { RideStateEnum, User, UserRoleEnum } from '../../api-client';

const useNavigateUser = () => {
  const { user, activeRide } = useUserContext();
  const navigate = useNavigate();

  const navigateAfterLogin = (explicitUser: User | undefined = undefined) => {
    const actualUser = explicitUser || user;

    if (actualUser?.role === 'Admin') {
      navigate('/backoffice');
    } else if (actualUser?.role === UserRoleEnum.Driver) {
      if (activeRide) {
        if (
          activeRide.state === RideStateEnum.Booked ||
          activeRide.state === RideStateEnum.DriverArrived
        ) {
          navigate('/driver/active');
        } else if (activeRide.state === RideStateEnum.Riding) {
          navigate('/driver/riding');
        }
      } else {
        navigate('/driver/rides');
      }
    } else if (actualUser?.role === UserRoleEnum.Requester) {
      if (activeRide) {
        if (
          activeRide.state === RideStateEnum.WaitingForDriver ||
          activeRide.state === RideStateEnum.Canceled
        ) {
          navigate('/passenger/order-ride');
        } else if (
          activeRide.state === RideStateEnum.Booked ||
          activeRide.state === RideStateEnum.DriverCanceled
        ) {
          navigate('/passenger/active');
        }
      } else {
        navigate('/passenger/order-ride');
      }
    }
  };

  const navigateOnRefresh = () => {
    if (user?.registrationState === 'Pending') {
      navigate('/processing-user');
    } else if (user?.registrationState === 'Approved') {
      if (user?.isInitialPassword) {
        navigate('/create-password');
      } else {
        navigateAfterLogin();
      }
    } else {
      navigate('/login');
    }
  };

  return { navigateAfterLogin, navigateOnRefresh };
};

export default useNavigateUser;
