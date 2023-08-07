import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setToken } from '../../../Config.ts';
import { useUserContext } from '../../../context/UserContext/UserContext.tsx';

const Logout = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
    setUser(null);
    navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;
