import { Outlet } from 'react-router-dom';
import RideCanceledModal from './RideCanceledModal';

const Passenger = () => {
  return (
    <>
      <Outlet />
      <RideCanceledModal />
    </>
  );
};

export default Passenger;
