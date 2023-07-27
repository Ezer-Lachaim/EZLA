import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cancel, Phone, AccessTimeFilled } from '@mui/icons-material';
import { Button } from '@mui/material';
import withLayout from '../../../components/LayoutHOC.tsx';
import { RideStateEnum } from '../../../../api-client';
import { api } from '../../../../Config.ts';
import DriverCanceledModal from './DriverCanceledModal.tsx';
import ConfirmCancelRideModal from '../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal.tsx';
import { useUserContext } from '../../../../context/UserContext/UserContext.tsx';

const ActiveRide = () => {
  const { activeRide: ride } = useUserContext();
  const navigate = useNavigate();
  const [confirmClose, setConfirmClose] = useState(false);

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

  const onCancelRide = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { ...ride, state: RideStateEnum.RequesterCanceled }
    });

    navigate('/passenger/order-ride');
  };

  return (
    <div className="w-full overflow-auto">
      <div className="bg-yellow-300 text-center rounded-md">
        <AccessTimeFilled className="fill-orange-600" />
        <p>המתנדב בדרך אליך</p>
      </div>
      <p className="text-center mt-4">{`זמן הגעה משוער ${ride?.destinationArrivalTime}`}</p>
      <div>
        <hr />
        <b className="mt-4">שם המתנדב</b>
        <p>{`${ride?.driver?.firstName} ${ride?.driver?.lastName}`}</p>
        <b>סוג רכב</b>
        <p>
          {ride?.driver?.carManufacturer} {ride?.driver?.carModel}
        </p>
        <b>לוחית זיהוי</b>
        <p>{ride?.driver?.carPlateNumber}</p>
        <hr />
        <b>כתובת איסוף</b>
        <p>{ride?.origin}</p>
        <b>כתובת יעד</b>
        <p>{ride?.destination}</p>
        <b>בקשות מיוחדות</b>
        {ride?.specialRequest?.map((specialRequest) => (
          <p>{specialRequest}</p>
        ))}
      </div>

      <Button variant="outlined" href={`tel:${ride?.driver?.cellPhone}`}>
        <Phone />
        צור קשר עם המתנדב
      </Button>

      <Button variant="outlined" color="error" onClick={() => setConfirmClose(true)}>
        <Cancel color="error" />
        ביטול הנסיעה
      </Button>

      <ConfirmCancelRideModal
        open={confirmClose}
        onCancel={onCancelRide}
        onContinue={() => setConfirmClose(false)}
      />

      <DriverCanceledModal
        open={ride?.state === RideStateEnum.DriverCanceled}
        onNewRide={onOrderNewRide}
        onCancel={onConfirmCancelRide}
      />
    </div>
  );
};

export default withLayout(ActiveRide, {
  title: 'נסיעה פעילה',
  showLogoutButton: true
});
