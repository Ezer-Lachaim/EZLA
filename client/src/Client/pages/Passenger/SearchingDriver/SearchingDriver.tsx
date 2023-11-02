import React from 'react';
import { Button, IconButton } from '@mui/material';
import { Cancel, Close } from '@mui/icons-material';
import car from '../../../../assets/car.png';
import ConfirmCancelRideModal from '../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal.tsx';
import withLayout from '../../../components/LayoutHOC.tsx';
import { useApiContext } from '../../../../contexts/ApiContext';
import { RideStateEnum } from '../../../../api-client';
import { useUserContext } from '../../../../contexts/UserContext.tsx';

const SearchingDriver = () => {
  const api = useApiContext();
  const { activeRide: ride, reFetchActiveRide } = useUserContext();
  const [confirmClose, setConfirmClose] = React.useState(false);

  const onCancelRide = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { state: RideStateEnum.RequesterCanceled }
    });
    await reFetchActiveRide();
    // navigation will occur automatically (in @../Passenger.tsx)
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col justify-center flex-grow items-center">
          <img src={car} alt="car" className="w-20 animate-bounce" />
          <h1 className="text-center">פנייתכם נקלטה</h1>
          <h1 className="text-center">אנא האזרו בסבלנות, זה עשוי לקחת מספר דקות</h1>
          <h1 className="text-center">
            במידה ואין מתנדבים זמינים כרגע, אנחנו ניצור אתכם קשר לפני שיצאו לדרך
          </h1>
        </div>
        <Button
          variant="outlined"
          color="error"
          className="flex gap-2"
          onClick={() => setConfirmClose(true)}
        >
          <Cancel color="error" fontSize="small" />
          ביטול נסיעה
        </Button>
      </div>
      <IconButton
        size="small"
        className="absolute left-2 top-1"
        onClick={() => setConfirmClose(true)}
      >
        <Close />
      </IconButton>

      <ConfirmCancelRideModal
        open={confirmClose}
        onCancel={async () => {
          await onCancelRide();
          setConfirmClose(false);
        }}
        onContinue={() => setConfirmClose(false)}
      />
    </>
  );
};

export default withLayout(SearchingDriver, {
  title: 'מחפשים מתנדבים',
  showLogoutButton: true
});
