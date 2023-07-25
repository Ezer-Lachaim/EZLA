import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Ride, RideStateEnum } from '../../../../api-client';
import { api } from '../../../../Config.ts';
import DriverCanceledModal from './DriverCanceledModal.tsx';

const ActiveRide = () => {
  const navigate = useNavigate();
  const [ride, setRide] = useState<Ride>();
  useEffect(() => {
    (async () => {
      setRide(await api.ride.getActiveRideForUser());
    })();
  }, []);

  const canceledRide = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { ...ride, state: RideStateEnum.Canceled }
    });
  };

  const onConfirmCancelRide = async () => {
    await canceledRide();
    navigate('/passenger/order-ride');
  };

  const onOrderNewRide = async () => {
    await canceledRide();

    const response = await api.ride.ridesPost({
      ride: {
        ...ride,
        state: RideStateEnum.WaitingForDriver,
        rideId: undefined,
        requestTimeStamp: undefined,
        driver: undefined
      }
    });

    console.log(response);

    navigate('/passenger/order-ride');
  };

  return (
    <div className="w-full h-full absolute top-0 bg-gray-200 overflow-auto">
      {JSON.stringify(ride)}

      <DriverCanceledModal
        open={ride?.state === RideStateEnum.DriverCanceled}
        onNewRide={onOrderNewRide}
        onCancel={onConfirmCancelRide}
      />
    </div>
  );
};

export default withLayout(ActiveRide, { title: 'נסיעה פעילה', showLogoutButton: true });
