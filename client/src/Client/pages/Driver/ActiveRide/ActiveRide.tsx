import { useEffect, useState } from 'react';
import { Button, Divider, Typography } from '@mui/material';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CancelIcon from '@mui/icons-material/Cancel';
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
      <ConfirmCancelRideModal
        open={confirmClose}
        onCancel={onCancel}
        onContinue={() => setConfirmClose(false)}
      />
    </div>
  );
};

export default withLayout(ActiveRide, { title: 'נסיעה פעילה', showLogoutButton: true });
