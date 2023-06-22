import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserContext } from '../context/UserContext/UserContext';
import { UserRoleEnum } from '../api-client';

const Client = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.registrationState === 'Pending') {
      navigate('/processing-user');
    } else if (user?.registrationState === 'Approved') {
      if (user?.isInitialPassword) {
        navigate('/create-password');
      } else if (user?.role === UserRoleEnum.Driver) {
        navigate('driver/rides');
      } else if (user?.role === UserRoleEnum.Requester) {
        navigate('passenger/order-ride');
      }
    } else {
      navigate('/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default Client;
