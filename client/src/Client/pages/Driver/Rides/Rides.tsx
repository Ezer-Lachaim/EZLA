import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Stack } from '@mui/material';
import { IconButton, Tab, Tabs } from '@material-ui/core';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Driver, Ride, RideStateEnum } from '../../../../api-client';
import { api, POLLING_INTERVAL } from '../../../../services/api';
import { useUserStore } from '../../../../services/auth/user';
import { RideCard } from './RideCard/RideCard.tsx';
import RideApprovalModal, { SubmitRideInputs } from './RideApprovalModal/RideApprovalModal';
import { useActiveRide } from '../../../../hooks/activeRide';
import RideContactModal from './RideContactModal/RideContactModal.tsx';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index = 0, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className=" p-3.5">{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Rides = () => {
  const [selectedTab, setSelectedTab] = useState('openCalls');
  const [selectedRide, setSelectedRide] = useState<Ride>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const user = useUserStore((state) => state.user);
  const { reFetch: reFetchActiveRide } = useActiveRide();
  const { data: rides = [] } = useQuery({
    queryKey: ['ridesGet'],
    queryFn: () =>
      api.ride.ridesGet({ state: RideStateEnum.WaitingForDriver || RideStateEnum.DriverCanceled }),
    refetchInterval: POLLING_INTERVAL
  });
  const { data: bookedRides = [] } = useQuery({
    queryKey: ['bookedRides'],
    queryFn: () => api.ride.ridesGet({ driverId: user?.userId }),
    refetchInterval: POLLING_INTERVAL
  });

  const sortedRides = [...rides].sort((a, b) => {
    const waitingTimeA = a.requestTimeStamp?.getTime() || 0;
    const waitingTimeB = b.requestTimeStamp?.getTime() || 0;
    return waitingTimeA - waitingTimeB;
  });

  const filteredRides = bookedRides
    .filter((ride) => ride.state === 'Booked' && ride.driver && ride.driver.userId === user?.userId)
    .sort((a, b) => {
      const waitingTimeA = a.requestTimeStamp?.getTime() || 0;
      const waitingTimeB = b.requestTimeStamp?.getTime() || 0;
      return waitingTimeA - waitingTimeB;
    });

  const handleChange = (_event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
    setSelectedTab(newValue === 0 ? 'openCalls' : 'myRides');
  };

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

      setIsModalOpen(false);
      setValue(1);
      setSelectedTab('myRides');
    }
  };

  const [showModal, setShowModal] = useState(false);

  const onClickCallback = () => {
    setShowModal(true);
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
        console.log('Ride state updated to DriverEnroute');
        await reFetchActiveRide();
        // navigation will occur automatically (in @../Driver.tsx)
      } catch (error) {
        console.log('Failed to update ride state');
      }
    }
    setShowModal(false);
  };

  return (
    <div className="w-full">
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            {...a11yProps(0)}
            className="flex items-center flex-1 bg-white shadow-md text-center"
            label={<span className="text-sm font-bold">קריאות פתוחות ({sortedRides.length})</span>}
          />
          <Tab
            {...a11yProps(1)}
            className="flex items-center flex-1 bg-white shadow-md text-center"
            label={<span className="text-sm font-bold">נסיעות שלי ({filteredRides.length})</span>}
          />
        </Tabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <div className="w-full h-full flex flex-col gap-5 pb-4">
          {sortedRides.length > 0 ? (
            <Stack spacing={2}>
              {sortedRides.map((ride) => (
                <RideCard
                  ride={ride}
                  key={`ride-${ride.rideId}`}
                  context={selectedTab === 'openCalls' ? 'openCalls' : 'myRides'}
                  onApprovePassenger={() => {
                    setSelectedRide(ride);
                    setIsModalOpen(true);
                  }}
                  rideId={ride.rideId}
                  onOpenContactModal={onClickCallback}
                />
              ))}
            </Stack>
          ) : (
            <div className="h-full flex flex-col justify-center items-center gap-4">
              <p className="text-center text-black">
                כרגע אין קריאות פתוחות,
                <br />
                נשלח לך ברגע שתפתח קריאה חדשה.
              </p>
            </div>
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {filteredRides.length > 0 ? (
          <div className="w-full h-full flex flex-col gap-5 pb-4">
            <Stack spacing={2}>
              {filteredRides.map((ride) => (
                <>
                  <RideCard
                    ride={ride}
                    key={`ride-${ride.rideId}`}
                    context={selectedTab === 'openCalls' ? 'openCalls' : 'myRides'}
                    onApprovePassenger={() => setIsModalOpen(true)}
                    rideId={ride.rideId}
                    onOpenContactModal={onClickCallback}
                  />
                  <RideContactModal
                    ride={ride}
                    key={`modal-${ride.rideId}`}
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => {
                      handleDriverEnroute(ride.rideId);
                    }}
                  />
                </>
              ))}
            </Stack>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center">
            <IconButton>
              <SentimentDissatisfiedIcon className="w-12 h-12" />
            </IconButton>
            <p className="text-center text-gray-600 text-body2 font-normal">
              אין לך נסיעות. <br />
              בחר/י נסיעה מקריאות פתוחות.
            </p>
          </div>
        )}
      </CustomTabPanel>
      {selectedRide && (
        <RideApprovalModal
          ride={selectedRide}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onSubmitRide}
        />
      )}
    </div>
  );
};
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
