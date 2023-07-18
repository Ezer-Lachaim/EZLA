import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setToken } from '../../../Config.ts';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
    navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;
