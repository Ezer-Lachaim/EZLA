import { useState } from 'react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Typography } from '@mui/material';
// import { format } from 'date-fns';
import PhoneIcon from '@mui/icons-material/LocalPhoneRounded';
import withLayout from '../../../components/LayoutHOC.tsx';
import { RideStateEnum } from '../../../../api-client';
import { api } from '../../../../services/api';
import ConfirmCancelRideModal from '../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal.tsx';
import DriverArrivedModal from './DriverArrivedModal.tsx';
import RequesterCanceledModal from './RequesterCanceledModal.tsx';
import { useActiveRide } from '../../../../hooks/activeRide';
import { ViewField } from '../../../components/ViewField/ViewField.tsx';
import { SpecialRequestsChips } from '../../../components/SpecicalRequests/SpecialRequests.tsx';

const ActiveRide = () => {
  const { activeRide: ride, reFetch: reFetchActiveRide } = useActiveRide();
  const [confirmClose, setConfirmClose] = useState(false);

  const onArrive = async () => {
    const newRide = { state: RideStateEnum.DriverArrived };
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: newRide
    });
  };

  const onCancel = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { state: RideStateEnum.DriverCanceled }
    });
    await reFetchActiveRide();
    // navigation will occur automatically (in @../Driver.tsx)
  };

  const onContinue = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { state: RideStateEnum.Riding }
    });
    await reFetchActiveRide();
    // navigation will occur automatically (in @../Driver.tsx)
  };

  const onGotoRides = async () => {
    await api.ride.postConfirmRideComplete();
    await reFetchActiveRide();
    // navigation will occur automatically (in @../Driver.tsx)
  };

  /*   let destinationTime;
  if (ride?.destinationArrivalTime) {
    destinationTime = format(new Date(ride.destinationArrivalTime), 'HH:mm');
  } */

  return (
    <div className="w-full pb-5 h-full flex flex-col">
      <Box
        sx={{ background: 'rgba(255, 152, 0, 0.10)' }}
        className="rounded-md flex items-center flex-col py-4 gap-2"
      >
        <DirectionsCarFilledIcon sx={{ fill: '#FF9800' }} fontSize="large" />
        <h1 className="font-medium m-0" style={{ color: '#FF9800' }}>
          נוסעים לאסוף את הנוסעים
        </h1>
      </Box>
      {/* {destinationTime && <h1 className="text-center">{`זמן הגעה משוער ${destinationTime}`}</h1>} */}
      <div className="flex-1">
        <hr />
        <ViewField
          label="שם הנוסע"
          value={
            <div className="flex items-center justify-between w-full mb-2">
              <p className="text-lg">
                {ride?.firstName || ride?.rideRequester?.firstName}{' '}
                {ride?.lastName || ride?.rideRequester?.lastName}
                <span className="px-2 text-sm">
                  {ride?.passengerCount && `(${ride?.passengerCount} נוסעים)`}
                </span>
              </p>
            </div>
          }
        />

        <ViewField
          label="כתובת איסוף"
          value={
            <div className="flex gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M20.54 6.63c.69.94 1.15 2.04 1.35 3.19c.21 1.25.11 2.52-.31 3.72a7.349 7.349 0 0 1-2 3.06a9.1 9.1 0 0 1-2.26 1.58c.41 1.07-.13 2.27-1.2 2.68c-.24.09-.49.14-.74.14a2.08 2.08 0 0 1-2.07-2h-3.07c-.11 1.14-1.13 2-2.27 1.87c-1.06-.1-1.86-.98-1.88-2.04c.01-.19.04-.39.1-.57a8.37 8.37 0 0 1-4-2.85c-.33-.44-.23-1.07.23-1.41c.18-.14.4-.22.63-.22c.72 0 1-.25 1.17-.63c.24-.72.38-1.47.39-2.23c.03-.53.09-1.05.17-1.57A7.307 7.307 0 0 1 7.5 5c1.66-1.3 3.69-2 5.79-2c1.43 0 2.84.35 4.11 1a8.67 8.67 0 0 1 3.14 2.63m-3.82 10.68c1.78-.81 3.18-2.27 3.87-4.1c1.62-4.94-2.59-9.16-7.3-9.16c-.35 0-.71.02-1.06.07C9.36 4.5 6.4 6.5 5.81 9.5c-.38 2 .19 5.29-2.76 5.29C4 16 5.32 16.93 6.81 17.37c.85-.76 2.16-.68 2.93.18c.11.12.2.25.26.39h3.55c.52-1.02 1.78-1.44 2.8-.9c.15.08.25.17.37.27m-5.75-7c-.58.03-1.09-.41-1.12-1c-.03-.58.42-1.08 1-1.12c.58-.03 1.09.42 1.12 1.06a.999.999 0 0 1-.97 1.04l-.03.02m4.69 0c-.58.03-1.09-.41-1.12-1c-.04-.58.42-1.08 1-1.12c.58-.03 1.09.42 1.12 1.06c.02.55-.41 1.02-1 1.04v.02m-5.95 1.76c-.06-.28.13-.57.41-.62c.28-.05.56.13.62.41a2.501 2.501 0 0 0 2.58 1.74c1.14.06 2.18-.64 2.57-1.72c.14-.26.46-.38.71-.23c.18.1.29.27.29.47c-.19.71-.63 1.33-1.23 1.76c-.69.48-1.5.75-2.34.76h-.11c-1.63.07-3.1-1-3.53-2.58l.03.01Z"
                />
              </svg>

              <Typography variant="body1" component="div" className="mb-2">
                <a href={`https://waze.com/ul?q=${ride?.origin}`} target="_blank" rel="noreferrer">
                  {ride?.origin}
                </a>
              </Typography>
            </div>
          }
        />

        <ViewField label="כתובת יעד" value={ride?.destination || ''} />

        {ride?.specialRequest && ride?.specialRequest?.length > 0 && (
          <ViewField
            label="בקשות מיוחדות"
            value={<SpecialRequestsChips specialRequests={ride?.specialRequest || []} />}
          />
        )}
        <ViewField
          label="מומלץ ליצור קשר עם הנוסעים לפני היציאה לדרך"
          value={
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="large"
                startIcon={<PhoneIcon />}
                href={`tel:${ride?.cellphone}`}
              >
                <span className="text-lg">צרו קשר</span>
              </Button>
            </div>
          }
        />
        <Box sx={{ width: '95%' }}>
          {ride?.comment && (
            <ViewField
              label="תיאור הנסיעה:"
              value={
                <Box style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
                  {ride?.comment || ''}
                </Box>
              }
            />
          )}
        </Box>
        <hr className="mt-2" />
      </div>

      <p className="text-center p-4 text-sm text-gray-500">אנא עדכנו כאשר הגעתם למקום האיסוף</p>
      <div className="flex flex-col gap-4">
        <Button
          className="flex gap-2 w-full"
          variant="contained"
          onClick={onArrive}
          color="secondary"
        >
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
