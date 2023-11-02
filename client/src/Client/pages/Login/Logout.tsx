import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';

const Logout = () => {
  const { setToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null); // user will be set to null automatically
    navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;
