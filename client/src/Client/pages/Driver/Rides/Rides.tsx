import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import { useQuery } from '@tanstack/react-query';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Driver, Ride, RideStateEnum } from '../../../../api-client';
import { api } from '../../../../Config.ts';
import { RideCard } from './RideCard/RideCard.tsx';
import RideApprovalModal, { SubmitRideInputs } from './RideApprovalModal/RideApprovalModal';
import { useUserContext } from '../../../../context/UserContext/UserContext';

const Rides = ({
  rides,
  setSelectedRide,
  selectedRide = undefined
}: {
  rides: Ride[];
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
  selectedRide?: Ride;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const onSelectRideCallback = useCallback((ride: Ride) => {
    setSelectedRide(ride);
  }, []);

  const onSubmitRide: SubmitHandler<SubmitRideInputs> = async ({ minutesToArrive }) => {
    if (selectedRide?.state === RideStateEnum.WaitingForDriver) {
      const driver = user as Driver;
      await api.ride.updateRide({
        rideId: selectedRide?.rideId || '',
        ride: {
          ...selectedRide,
          state: RideStateEnum.Booked,
          driver: {
            userId: driver?.userId,
            firstName: driver?.firstName,
            lastName: driver?.lastName,
            carManufacturer: driver?.carManufacturer,
            carModel: driver?.carModel,
            carColor: driver?.carColor,
            carPlateNumber: driver?.carPlateNumber
          },
          destinationArrivalTime: new Date().getTime() + minutesToArrive * 60000
        }
      });

      setIsModalOpen(false);
      navigate('/driver/active');
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
        {rides.length > 0 ? (
          <>
            <h1 className="m-0 text-center text-black">
              בחרו נסיעה מתוך {rides.length} קריאות פתוחות
            </h1>
            {rides.map((ride) => (
              <RideCard
                ride={ride}
                key={`ride-${ride.rideId}`}
                onSelect={onSelectRideCallback}
                selected={selectedRide?.rideId === ride.rideId}
                onApprovePassenger={() => setIsModalOpen(true)}
              />
            ))}
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
  const [selectedRide, setSelectedRide] = useState<Ride>();

  const { data: rides } = useQuery({
    queryKey: ['ridesGet'],
    queryFn: async () => {
      const res = await api.ride.ridesGet({ state: RideStateEnum.WaitingForDriver });
      return res;
    },
    refetchInterval: 2000
  });

  const openRides = rides?.sort(
    (a, b) => (a?.requestTimeStamp?.getTime() || 0) - (b?.requestTimeStamp?.getTime() || 0)
  );

  const RidesWithLayout = withLayout(Rides, {
    componentProps: { rides: openRides || [], setSelectedRide, selectedRide },
    title: openRides?.length ? `קריאות פתוחות (${openRides?.length})` : '',
    showLogoutButton: true,
    backgroundColor: 'bg-gray-100',
    hideFooter: true
  });

  return <RidesWithLayout />;
};

export default RidesHOC;
