import { useEffect, useState, useCallback } from 'react';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Ride, RideStateEnum } from '../../../../api-client';
import { api } from '../../../../Config.ts';
import { RideCard } from './RideCard/RideCard.tsx';

const Rides = ({ rides }: { rides: Ride[] }) => {
  const [selectedRide, setSelectedRide] = useState<Ride>();
  const onSelectRideCallback = useCallback((ride: Ride) => {
    setSelectedRide(ride);
  }, []);

  return (
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
            />
          ))}
        </>
      ) : (
        <p className="text-center text-black mt-5">
          כרגע אין קריאות פתוחות, נשלח לך ברגע שתפתח קריאה חדשה.
        </p>
      )}
    </div>
  );
};

const RidesHOC = () => {
  const [rides, setRides] = useState<Ride[]>();

  useEffect(() => {
    (async () => {
      setRides(await api.ride.ridesGet());
    })();
  }, []);

  const openRides = rides?.filter((ride) => ride.state === RideStateEnum.WaitingForDriver);

  const RidesWithLayout = withLayout(() => <Rides rides={openRides || []} />, {
    title: `קריאות פתוחות (${openRides?.length})`,
    showLogoutButton: true,
    backgroundColor: 'bg-gray-100',
    hideFooter: true
  });

  return <RidesWithLayout />;
};

export default RidesHOC;
