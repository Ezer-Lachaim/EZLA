import { useEffect, useState, useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Driver, Ride, RideStateEnum } from '../../../../api-client';
import { api } from '../../../../Config.ts';
import { RideCard } from './RideCard/RideCard.tsx';
import RideApprovalModal, { SubmitRideInputs } from './RideApprovalModal/RideApprovalModal';
import { useUserContext } from '../../../../context/UserContext/UserContext';

const Rides = ({ rides }: { rides: Ride[] }) => {
  const [selectedRide, setSelectedRide] = useState<Ride>();
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
      <div className="w-full flex flex-col gap-5 pb-4">
        {rides.length > 0 ? (
          <>
            <h1 className="m-0 text-center text-black">
              בחרו נסיעה מתוך {rides.length} קריאות פתוחות
            </h1>
            {rides.map((ride, index) => (
              <RideCard
                ride={ride}
                key={`ride-${index}`}
                onSelect={onSelectRideCallback}
                selected={selectedRide === ride}
                onApprovePassenger={() => setIsModalOpen(true)}
              />
            ))}
          </>
        ) : (
          <p className="text-center text-black mt-5">
            כרגע אין קריאות פתוחות, נשלח לך ברגע שתפתח קריאה חדשה.
          </p>
        )}
      </div>
    </>
  );
};

const RidesHOC = () => {
  const [rides, setRides] = useState<Ride[]>();

  useEffect(() => {
    (async () => {
      setRides(await api.ride.ridesGet());
    })();
  }, []);

  const openRides = rides
    ?.filter((ride) => ride.state === RideStateEnum.WaitingForDriver)
    ?.sort((a, b) => (a?.requestTimeStamp?.getTime() || 0) - (b?.requestTimeStamp?.getTime() || 0));

  const RidesWithLayout = withLayout(() => <Rides rides={openRides || []} />, {
    title: openRides?.length ? `קריאות פתוחות (${openRides?.length})` : '',
    showLogoutButton: true,
    backgroundColor: 'bg-gray-100',
    hideFooter: true
  });

  return <RidesWithLayout />;
};

export default RidesHOC;
