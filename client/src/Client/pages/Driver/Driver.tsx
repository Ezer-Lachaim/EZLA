import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useActiveRide } from '../../../hooks/activeRide';
import { RideStateEnum } from '../../../api-client';

const Driver = () => {
  const { activeRide } = useActiveRide();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let expectedRoute: string;
    switch (activeRide?.state) {
      case RideStateEnum.Booked:
      case RideStateEnum.DriverArrived:
      case RideStateEnum.RequesterCanceled:
        expectedRoute = 'active';
        break;
      case RideStateEnum.Riding:
        expectedRoute = 'riding';
        break;
      case RideStateEnum.Completed:
        expectedRoute = 'completed';
        break;
      default: // no active ride
        expectedRoute = 'rides';
    }

    const expectedPath = `/driver/${expectedRoute}`;
    if (location.pathname !== expectedPath) {
      navigate(expectedPath);
    }
  }, [activeRide, location, navigate]);

  return <Outlet />;
};

export default Driver;
