import { Outlet, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext/UserContext';

const Client = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  if (user?.registrationState === 'Pending') {
    navigate('/processing-user');
  } else if (user?.registrationState === 'Approved' && user.isInitialPassword) {
    navigate('/create-password');
  }

  return <Outlet />;
};

export default Client;
