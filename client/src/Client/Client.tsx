import { Outlet, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext/UserContext';
import { UserRoleEnum } from '../api-client';

const Client = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  if (user?.registrationState === 'Pending') {
    navigate('/processing-user');
  } else if (user?.registrationState === 'Approved') {
    if (user.isInitialPassword) {
      navigate('/create-password');
    } else if (user?.role === UserRoleEnum.Driver) {
      navigate('driver/rides');
    } else if (user?.role === UserRoleEnum.Requester) {
      navigate('passenger/order-ride');
    }
  }

  return <Outlet />;
};

export default Client;
