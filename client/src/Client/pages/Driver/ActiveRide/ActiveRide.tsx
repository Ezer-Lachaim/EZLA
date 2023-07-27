import { useState } from 'react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../../components/LayoutHOC.tsx';
import { RideStateEnum } from '../../../../api-client';
import { api } from '../../../../Config.ts';
import ConfirmCancelRideModal from '../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal.tsx';
import DriverArrivedModal from './DriverArrivedModal.tsx';
import RequesterCanceledModal from './RequesterCanceledModal.tsx';
import { useUserContext } from '../../../../context/UserContext/UserContext.tsx';

const ActiveRide = () => {
  const { activeRide: ride, setActiveRide } = useUserContext();
  const [confirmClose, setConfirmClose] = useState(false);
  const navigate = useNavigate();

  const onArrive = async () => {
    const newRide = { ...ride, state: RideStateEnum.DriverArrived };
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: newRide
    });
    console.log('Arrived');

    setActiveRide(newRide);
  };

  const onCancel = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { ...ride, state: RideStateEnum.DriverCanceled }
    });
    console.log('Ride canceled');

    navigate('/driver/rides');
  };

  const onContinue = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { ...ride, state: RideStateEnum.Riding }
    });
    console.log('Riding');

    navigate('/driver/riding');
  };

  const onGotoRides = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { ...ride, state: RideStateEnum.Canceled }
    });

    navigate('/driver/rides');
  };

  return (
    <div className="w-full overflow-auto">
      <div className="bg-yellow-300 text-center rounded-md">
        <DirectionsCarFilledIcon className="fill-orange-600" />
        <p>נוסעים לאסוף את הנוסעים </p>
      </div>
      <p className="text-center mt-4">{`זמן הגעה משוער ${ride?.destinationArrivalTime}`}</p>
      <div>
        <b className="mt-4">שם הנוסע</b>
        <p>{`${ride?.rideRequester?.firstName} ${ride?.rideRequester?.lastName}`}</p>
        <b>כתובת איסוף</b>
        <p>{ride?.origin}</p>
        <b>כתובת יעד</b>
        <p>{ride?.destination}</p>
        <b>בקשות מיוחדות</b>
        {ride?.specialRequest?.map((specialRequest) => (
          <p>{specialRequest}</p>
        ))}
      </div>

      <Button variant="contained" onClick={onArrive}>
        הגעתי למקום האיסוף
      </Button>
      <Button variant="outlined" color="error" onClick={() => setConfirmClose(true)}>
        ביטול הנסיעה
      </Button>

      <DriverArrivedModal
        open={ride?.state === RideStateEnum.DriverArrived}
        requesterPhone={ride?.rideRequester?.cellPhone || ''}
        onContinue={onContinue}
        onCancel={() => setConfirmClose(true)}
      />

      <ConfirmCancelRideModal
        open={confirmClose}
        onCancel={onCancel}
        onContinue={() => setConfirmClose(false)}
      />

      <RequesterCanceledModal
        open={ride?.state === RideStateEnum.RequesterCanceled}
        onGotoRides={onGotoRides}
      />
    </div>
  );
};

export default withLayout(ActiveRide, {
  title: 'נסיעה פעילה',
  showLogoutButton: true
});
