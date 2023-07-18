import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useNavigateUser from './hooks/useNavigateUser.ts';

const Client = () => {
  const { navigateOnRefresh } = useNavigateUser();

  useEffect(() => {
    navigateOnRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default Client;
