import { useState } from 'react';
import { Cancel, Phone } from '@mui/icons-material';
import ClockIcon from '@mui/icons-material/AccessTimeRounded';
import { Box, Button } from '@mui/material';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import { v4 as uuidv4 } from 'uuid';
import withLayout from '../../../components/LayoutHOC.tsx';
import { RideStateEnum } from '../../../../api-client';
import { api } from '../../../../services/api';
import { useUserStore } from '../../../../services/auth/user';
import { setToken as setGuestToken } from '../../../../services/auth/guest';
import { useActiveRide } from '../../../../hooks/activeRide';
import DriverCanceledModal from './DriverCanceledModal.tsx';
import ConfirmCancelRideModal from '../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal.tsx';
import { ViewField } from '../../../components/ViewField/ViewField.tsx';
import { SpecialRequestsChips } from '../../../components/SpecialRequests/SpecialRequests.tsx';
import { formatPickupDateTime } from '../../../../utils/datetime.ts';

const ActiveRide = () => {
  const user = useUserStore((state) => state.user);
  const { activeRide: ride, reFetch: reFetchActiveRide } = useActiveRide();
  const [confirmClose, setConfirmClose] = useState(false);

  const canceledRide = async () => {
    await api.ride.postConfirmRideComplete();
    await reFetchActiveRide();
  };

  const onConfirmCancelRide = async () => {
    await canceledRide();
    // navigation will occur automatically (in @../Passenger.tsx)
  };

  const onOrderNewRide = async () => {
    await canceledRide();

    if (!user) {
      setGuestToken(uuidv4());
    }

    await api.ride.ridesPost({
      ride: {
        ...ride,
        state: RideStateEnum.WaitingForDriver,
        rideId: undefined,
        requestTimeStamp: undefined,
        driver: undefined
      }
    });
    await reFetchActiveRide();
    // navigation will occur automatically (in @../Passenger.tsx)
  };

  const onCancelRide = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId ?? '',
      ride: { state: RideStateEnum.RequesterCanceled }
    });

    setGuestToken(null);

    await reFetchActiveRide();
    // navigation will occur automatically (in @../Passenger.tsx)
  };

  /*   let destinationTime;
  if (ride?.destinationArrivalTime) {
    destinationTime = format(new Date(ride.destinationArrivalTime), 'HH:mm');
  } */

  return (
    <div className="w-full pb-5 h-full flex flex-col">
      {ride?.state === 'Booked' ? (
        <Box
          sx={{ background: 'rgba(255, 152, 0, 0.10)' }}
          className="rounded-md flex items-center flex-col py-4 gap-2"
        >
          <ClockIcon sx={{ fill: '#FF9800' }} fontSize="large" />
          <h1 className="font-medium m-0" style={{ color: '#FF9800' }}>
            נמצא מתנדב/ת
          </h1>
        </Box>
      ) : (
        <Box
          sx={{ background: 'rgba(76, 175, 80, 0.1)' }}
          className="rounded-md flex items-center flex-col py-4 gap-2"
        >
          <CarIcon sx={{ fill: '#4CAF50' }} fontSize="large" />
          <h1 className="font-medium m-0" style={{ color: '#4CAF50' }}>
            המתנדב/ת בדרך אליך
          </h1>
        </Box>
      )}
      <div className="flex-1">
        <h1 className="text-center">
          מועד איסוף
          <br />
          {formatPickupDateTime(ride?.pickupDateTime, ride?.relevantTime)}
        </h1>
        <hr />
        <ViewField
          label="שם המתנדב"
          value={`${ride?.driver?.firstName} ${ride?.driver?.lastName}`}
        />
        <ViewField
          label="סוג רכב"
          value={
            ride?.driver?.carManufacturer
              ? `${ride?.driver?.carManufacturer} ${ride?.driver?.carModel}`
              : ''
          }
        />
        <ViewField label="לוחית זיהוי" value={ride?.driver?.carPlateNumber || ''} />

        <hr className="mt-2" />
        <ViewField label="כתובת איסוף" value={ride?.origin || ''} />
        <ViewField label="כתובת יעד" value={ride?.destination || ''} />
        <ViewField label="תיאור הנסיעה" value={ride?.comment || ''} />
        {ride?.specialRequest && ride.specialRequest.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">בקשות מיוחדות</p>
            <SpecialRequestsChips specialRequests={ride.specialRequest} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <Button variant="outlined" href={`tel:${ride?.driver?.cellPhone}`}>
          <Phone className="ml-2" />
          צרו קשר עם המתנדב
        </Button>

        <Button variant="outlined" color="error" onClick={() => setConfirmClose(true)}>
          <Cancel color="error" className="ml-2" />
          ביטול הנסיעה
        </Button>
      </div>

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
