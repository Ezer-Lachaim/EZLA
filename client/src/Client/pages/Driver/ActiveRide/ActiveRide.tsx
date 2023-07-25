import { useEffect, useState } from 'react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Ride, RideStateEnum } from '../../../../api-client';
import { api } from '../../../../Config.ts';
import ConfirmCancelRideModal from '../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal.tsx';

const ActiveRide = () => {
  const [confirmClose, setConfirmClose] = useState(false);
  const [ride, setRide] = useState<Ride>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setRide(await api.ride.getActiveRideForUser());
    })();
  }, []);

  const onArrive = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { ...ride, state: RideStateEnum.DriverArrived }
    });
    console.log('Arrived');
  };

  const onCancel = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { ...ride, state: RideStateEnum.DriverCanceled }
    });
    console.log('Ride canceled');

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
        <p className="mt-4">שם הנוסע</p>
        <p>{`${ride?.rideRequester?.firstName} ${ride?.rideRequester?.lastName}`}</p>
        <p>כתובת איסוף</p>
        <p>{ride?.origin}</p>
        <p>כתובת יעד</p>
        <p>{ride?.destination}</p>
        <p>בקשות מיוחדות</p>
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

      <ConfirmCancelRideModal
        open={confirmClose}
        onCancel={onCancel}
        onContinue={() => setConfirmClose(false)}
      />
    </div>
  );
};

export default withLayout(ActiveRide, { title: 'נסיעה פעילה', showLogoutButton: true });
