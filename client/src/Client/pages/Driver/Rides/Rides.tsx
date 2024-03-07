import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Stack, IconButton, Tab, Tabs } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Driver, Ride, RideStateEnum } from '../../../../api-client';
import { api, POLLING_INTERVAL } from '../../../../services/api';
import { useUserStore } from '../../../../services/auth/user';
import { RideCard } from './RideCard/RideCard.tsx';
import RideApprovalModal, { SubmitRideInputs } from './RideApprovalModal/RideApprovalModal';
import { useActiveRide } from '../../../../hooks/activeRide';
import RideContactModal from './RideContactModal/RideContactModal.tsx';

enum TabsEnum {
  OpenCalls,
  MyRides
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

async function fetchSortedRides(filters: Parameters<typeof api.ride.ridesGet>[0]) {
  const rides = await api.ride.ridesGet(filters);
  rides.sort((a, b) => {
    const waitingTimeA = a.requestTimeStamp?.getTime() || 0;
    const waitingTimeB = b.requestTimeStamp?.getTime() || 0;
    return waitingTimeA - waitingTimeB;
  });

  return rides;
}

const Rides = () => {
  const [selectedTab, setSelectedTab] = useState(TabsEnum.OpenCalls);
  const [selectedRide, setSelectedRide] = useState<Ride>();
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { reFetch: reFetchActiveRide } = useActiveRide();
  const { data: openRides = [] } = useQuery({
    queryKey: ['openRides'],
    queryFn: () =>
      fetchSortedRides({ state: RideStateEnum.WaitingForDriver || RideStateEnum.DriverCanceled }),
    refetchInterval: POLLING_INTERVAL
  });
  const { data: userRides = [] } = useQuery({
    queryKey: ['userRides'],
    queryFn: () => fetchSortedRides({ driverId: user?.userId, state: RideStateEnum.Booked }),
    refetchInterval: POLLING_INTERVAL
  });
  const displayedRides = selectedTab === TabsEnum.OpenCalls ? openRides : userRides;

  const onSubmitRide: SubmitHandler<SubmitRideInputs> = async () => {
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
          }
        }
      });
      await reFetchActiveRide();
      // navigation will occur automatically (in @../Driver.tsx)

      setIsApprovalModalOpen(false);
      setSelectedTab(TabsEnum.MyRides);
    }
  };

  const handleDriverEnroute = async (rideId: string | undefined) => {
    if (rideId) {
      try {
        await api.ride.updateRide({
          rideId: rideId || '',
          ride: {
            state: RideStateEnum.DriverEnroute
          }
        });

        await reFetchActiveRide();
        // navigation will occur automatically (in @../Driver.tsx)
      } catch (error) {
        console.log('Failed to update ride state');
      }
    }
    setIsContactModalOpen(false);
  };

  return (
    <div className="w-full">
      <div>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue as TabsEnum)}
          aria-label="Rides tabs"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            value={TabsEnum.OpenCalls}
            {...a11yProps(0)}
            className="flex items-center flex-1 bg-white shadow-md text-center"
            label={<span className="text-sm font-bold">קריאות פתוחות ({openRides.length})</span>}
          />
          <Tab
            value={TabsEnum.MyRides}
            {...a11yProps(1)}
            className="flex items-center flex-1 bg-white shadow-md text-center"
            label={<span className="text-sm font-bold">נסיעות שלי ({userRides.length})</span>}
          />
        </Tabs>
      </div>
      <div className="w-full h-full flex flex-col gap-5 py-4">
        {displayedRides.length > 0 ? (
          <Stack spacing={2}>
            {displayedRides.map((ride) => (
              <RideCard
                ride={ride}
                key={`ride-${ride.rideId}`}
                isApprovePassenger={selectedTab === TabsEnum.OpenCalls}
                onApprovePassenger={() => {
                  setSelectedRide(ride);
                  setIsApprovalModalOpen(true);
                }}
                rideId={ride.rideId}
                onOpenContactModal={() => {
                  setSelectedRide(ride);
                  setIsContactModalOpen(true);
                }}
              />
            ))}
          </Stack>
        ) : (
          <NoRidesMessage isOpenCalls={selectedTab === TabsEnum.OpenCalls} />
        )}
      </div>

      {selectedRide && (
        <>
          <RideApprovalModal
            ride={selectedRide}
            open={isApprovalModalOpen}
            onClose={() => setIsApprovalModalOpen(false)}
            onSubmit={onSubmitRide}
          />
          <RideContactModal
            ride={selectedRide}
            open={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
            onConfirm={() => handleDriverEnroute(selectedRide.rideId)}
          />
        </>
      )}
    </div>
  );
};

function NoRidesMessage({ isOpenCalls }: { isOpenCalls: boolean }) {
  if (isOpenCalls) {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-4">
        <p className="text-center text-black">
          כרגע אין קריאות פתוחות,
          <br />
          נשלח לך ברגע שתפתח קריאה חדשה.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <IconButton>
        <SentimentDissatisfiedIcon className="w-12 h-12" />
      </IconButton>
      <p className="text-center text-gray-600 text-body2 font-normal">
        אין לך נסיעות. <br />
        בחר/י נסיעה מקריאות פתוחות.
      </p>
    </div>
  );
}

const RidesHOC = () => {
  const RidesWithLayout = withLayout(Rides, {
    title: 'נסיעות',
    showLogoutButton: true,
    backgroundColor: 'bg-gray-100',
    hideFooter: true
  });

  return <RidesWithLayout />;
};

export default RidesHOC;
