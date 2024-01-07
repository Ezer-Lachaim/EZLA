import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RideStateEnum } from '../../../api-client';
import { useActiveRide } from '../../../hooks/activeRide';
import RideCanceledModal from './RideCanceledModal';

const Passenger = () => {
  const { activeRide } = useActiveRide();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let expectedRoute: string;
    switch (activeRide?.state) {
      case RideStateEnum.WaitingForDriver:
        expectedRoute = 'searching-driver';
        break;
      case RideStateEnum.DriverArrived:
        expectedRoute = 'driver-arrived';
        break;
      case RideStateEnum.Booked:
      case RideStateEnum.DriverCanceled:
        expectedRoute = 'active';
        break;
      case RideStateEnum.Riding:
        expectedRoute = 'riding';
        break;
      case RideStateEnum.Completed:
        expectedRoute = 'completed';
        break;
      default: // no active ride or canceled
        expectedRoute = 'order-ride';
    }

    const expectedPath = `/passenger/${expectedRoute}`;
    if (location.pathname !== expectedPath) {
      navigate(expectedPath);
    }
  }, [activeRide, location, navigate]);

  return (
    <>
      <Outlet />
      <RideCanceledModal />
    </>
  );
};

export default Passenger;
