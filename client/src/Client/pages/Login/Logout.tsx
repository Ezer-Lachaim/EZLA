import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { signOut } from '../../../services/auth/user';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await signOut(); // user will automatically be set to null in the user service
      navigate('/login');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;
