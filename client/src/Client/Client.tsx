import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useNavigateUser from './hooks/useNavigateUser.ts';
import { useUserContext } from '../context/UserContext/UserContext';

const Client = () => {
  const { activeRide } = useUserContext();
  const { navigateOnUser } = useNavigateUser();

  useEffect(() => {
    navigateOnUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRide?.state]);

  return <Outlet />;
};

export default Client;
