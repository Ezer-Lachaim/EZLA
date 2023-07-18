import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext/UserContext.tsx';
import { User, UserRoleEnum } from '../../api-client';

const useNavigateUser = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const navigateAfterLogin = (explicitUser: User | undefined = undefined) => {
    const actualUser = explicitUser || user;

    if (actualUser?.role === 'Admin') {
      navigate('/backoffice');
    } else if (actualUser?.role === UserRoleEnum.Driver) {
      navigate('/driver/rides');
    } else if (actualUser?.role === UserRoleEnum.Requester) {
      navigate('/passenger/order-ride');
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
