import { useState, useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import { useQuery } from '@tanstack/react-query';
import { Stack } from '@mui/material';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Driver, Ride, RideStateEnum } from '../../../../api-client';
import { api, POLLING_INTERVAL } from '../../../../services/api';
import { useUserStore } from '../../../../services/auth/user';
import { RideCard } from './RideCard/RideCard.tsx';
import RideApprovalModal, { SubmitRideInputs } from './RideApprovalModal/RideApprovalModal';
import { useActiveRide } from '../../../../hooks/activeRide';

const Rides = () => {
  const [selectedRide, setSelectedRide] = useState<Ride>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { reFetch: reFetchActiveRide } = useActiveRide();
  const { data: rides = [] } = useQuery({
    queryKey: ['ridesGet'],
    queryFn: () => api.ride.ridesGet({ state: RideStateEnum.WaitingForDriver }),
    refetchInterval: POLLING_INTERVAL
  });

  const sortedRides = [...rides].sort((a, b) => {
    const waitingTimeA = a.requestTimeStamp?.getTime() || 0;
    const waitingTimeB = b.requestTimeStamp?.getTime() || 0;
    return waitingTimeA - waitingTimeB;
  });

  const onSelectRideCallback = useCallback((ride: Ride) => {
    setSelectedRide(ride);
  }, []);

  const onSubmitRide: SubmitHandler<SubmitRideInputs> = async ({ minutesToArrive }) => {
    if (selectedRide?.state === RideStateEnum.WaitingForDriver) {
      const driver = user as Driver;
      await api.ride.updateRide({
        rideId: selectedRide?.rideId || '',
        ride: {
          state: RideStateEnum.Booked,
          driver: {
            userId: driver?.userId,
            firstName: driver?.firstName,
            lastName: driver?.lastName,
            cellPhone: driver?.cellPhone,
            carManufacturer: driver?.carManufacturer,
            carModel: driver?.carModel,
            carColor: driver?.carColor,
            carPlateNumber: driver?.carPlateNumber
          },
          destinationArrivalTime: new Date().getTime() + minutesToArrive * 60000
        }
      });
      await reFetchActiveRide();
      // navigation will occur automatically (in @../Driver.tsx)

      setIsModalOpen(false);
    }
  };

  return (
    <>
      <RideApprovalModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmitRide}
      />
      <div className="w-full h-full flex flex-col gap-5 pb-4">
        {sortedRides.length > 0 ? (
          <>
            <h1 className="m-0 text-center text-black">
              בחרו נסיעה מתוך {sortedRides.length} קריאות פתוחות
            </h1>
            <Stack spacing={2}>
              {sortedRides.map((ride) => (
                <RideCard
                  ride={ride}
                  key={`ride-${ride.rideId}`}
                  onSelect={onSelectRideCallback}
                  selected={selectedRide?.rideId === ride.rideId}
                  onApprovePassenger={() => setIsModalOpen(true)}
                />
              ))}
            </Stack>
          </>
        ) : (
          <div className="h-full flex flex-col justify-center items-center gap-4">
            <p className="text-center text-black">
              כרגע אין קריאות פתוחות,
              <br />
              נשלח לך ברגע שתפתח קריאה חדשה.
            </p>
            <HourglassEmptyRoundedIcon fontSize="medium" className="animate-bounce" />
          </div>
        )}
      </div>
    </>
  );
};

const RidesHOC = () => {
  const RidesWithLayout = withLayout(Rides, {
    title: 'קריאות פתוחות',
    showLogoutButton: true,
    backgroundColor: 'bg-gray-100',
    hideFooter: true
  });

  return <RidesWithLayout />;
};

export default RidesHOC;
