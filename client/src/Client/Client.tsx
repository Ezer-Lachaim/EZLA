import { Outlet, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext/UserContext';

const Client = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  if (user?.registrationState === 'Pending') {
    navigate('/processing-user');
  } else if (user?.registrationState === 'Approved') {
    if (user.isInitialPassword) {
      navigate('/create-password');
    } else {
      navigate('/passenger/order-ride');

      // Need to check if passenger/volunteer and route
    }
  }

  return <Outlet />;
};

export default Client;
