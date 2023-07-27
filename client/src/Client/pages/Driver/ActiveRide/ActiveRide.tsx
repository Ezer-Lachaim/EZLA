import { useState } from 'react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Divider, Typography } from '@mui/material';
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
    <div className="flex flex-col pb-2 justify-between w-full h-full overflow-auto">
      <div>
        <div className="bg-yellow-50 text-center rounded-md">
          <DirectionsCarFilledIcon fontSize="large" className="fill-orange-400 mt-3" />
          <Typography variant="h6" className="text-orange-400 pb-3">
            נוסעים לאסוף את הנוסעים
          </Typography>
        </div>
        <p className="text-center mt-4 text-blue-500 font-bold mb-2">{`זמן הגעה משוער ${ride?.destinationArrivalTime}`}</p>

        <div>
          <Divider className="my-1" />
          <Typography color="GrayText" variant="body2" component="div">
            שם הנוסע
          </Typography>
          <div className="flex items-center justify-between w-full mb-2">
            <Typography variant="body1" component="div">
              {`${ride?.rideRequester?.firstName} ${ride?.rideRequester?.lastName}`}
            </Typography>
            <div className="flex bg-green-500 rounded-full text-white items-center px-2 py-1">
              <p className="px-1 font-medium">{ride?.passengerCount}</p>
              <EmojiPeopleRoundedIcon className="h-5" />
            </div>
          </div>
          <Typography color="GrayText" variant="body2" component="div">
            כתובת איסוף
          </Typography>
          <Typography variant="body1" component="div" className="mb-2">
            <a href={`https://waze.com/ul?q=${ride?.origin}`} target="_blank" rel="noreferrer">
              {ride?.origin}
            </a>
          </Typography>
          <Typography color="GrayText" variant="body2" component="div">
            כתובת יעד
          </Typography>
          <Typography variant="body1" component="div" className="mb-2">
            {ride?.destination}
          </Typography>
          <Typography color="GrayText" variant="body2" component="div">
            בקשות מיוחדות
          </Typography>
          {ride?.specialRequest?.map((specialRequest) => (
            <Typography variant="body1" component="div">
              {specialRequest}
            </Typography>
          ))}
        </div>
      </div>
      <div>
        <Divider className="my-1" />
        <Typography
          color="GrayText"
          variant="body2"
          component="div"
          className="text-center p-4 text-xs"
        >
          אנא עדכנו כאשר הגעתם למקום האיסוף
        </Typography>
        <Button className="flex gap-2 w-full mb-6" variant="contained" onClick={onArrive}>
          <FmdGoodIcon className="fill-white" />
          הגעתי למקום האיסוף
        </Button>
        <Button
          className="flex gap-2 w-full"
          variant="outlined"
          color="error"
          onClick={() => setConfirmClose(true)}
        >
          <CancelIcon className="fill-red-600" />
          ביטול הנסיעה
        </Button>
      </div>

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
