import { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Ride, RideStateEnum } from '../../../../../api-client';
import { SpecialRequestsChips } from '../../../../components/SpecialRequests/SpecialRequests';
import { useActiveRide } from '../../../../../hooks/activeRide';
import { api } from '../../../../../services/api';
import ConfirmCancelRideModal from '../../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal';
import { formatPickupDateTime } from '../../../../../utils/datetime';

export const RideCard = ({
  ride,
  context,
  onOpenContactModal,
  onApprovePassenger
}: {
  ride: Ride;
  context: 'openCalls' | 'myRides';
  onOpenContactModal: () => void;
  onApprovePassenger: () => void;
  rideId: string | undefined;
}) => {
  const { reFetch: reFetchActiveRide } = useActiveRide();
  const [confirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);

  const toggleConfirmCancelModal = () => {
    setConfirmCancelModalOpen(!confirmCancelModalOpen);
  };

  const onCancel = async () => {
    try {
      await api.ride.updateRide({
        rideId: ride.rideId || '',
        ride: { state: RideStateEnum.WaitingForDriver }
      });
      await reFetchActiveRide();
      // navigation will occur automatically (in @../Driver.tsx)
    } catch (error) {
      console.error('Error canceling ride:', error);
    }
  };

  return (
    <Card className="shadow-sm rounded-xl">
      <CardContent>
        <div className="flex flex-col w-full h-full gap-2 m-5">
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-2.5 w-full">
              <div className="flex items-center gap-[0.3125rem]">
                <Typography className="font-normal text-xs w-20">מועד איסוף:</Typography>

                <Typography className="font-bold">
                  {formatPickupDateTime(ride.pickupDateTime, ride.relevantTime, true)}
                </Typography>
              </div>
              <div className="flex items-center gap-[0.3125rem]">
                <Typography className="font-normal text-xs w-20">כמות:</Typography>
                <Typography className="font-bold">
                  {' '}
                  {ride?.serviceType === 'ride' ? <EmojiPeopleIcon /> : <InventoryIcon />}
                  {ride.passengerCount}
                </Typography>
              </div>
              {context === 'myRides' && (
                <>
                  <div className="flex items-center gap-[0.3125rem]">
                    <Typography className="font-normal text-xs w-20">שם הנוסע:</Typography>
                    <Typography className="font-bold">
                      {ride?.firstName} {ride?.lastName}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-[0.3125rem]">
                    <Typography className="font-normal text-xs w-20">טלפון:</Typography>
                    <Typography>
                      {' '}
                      <a
                        href={`https://wa.me/972${ride?.cellphone?.replace(/-/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {ride?.cellphone}
                      </a>{' '}
                    </Typography>{' '}
                  </div>
                </>
              )}
              <div className="flex items-center gap-[0.3125rem]">
                <Typography className="font-normal text-xs w-20">כתובת איסוף:</Typography>
                <a
                  className="content-normal min-w-0 break-words"
                  href={`https://waze.com/ul?q=${ride?.origin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ride?.origin}
                </a>
              </div>

              <div className="flex items-center gap-[0.3125rem]">
                <Typography className="font-normal text-xs w-20">יעד נסיעה:</Typography>
                <a
                  className="min-w-0 break-words"
                  href={`https://waze.com/ul?q=${ride.destination}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ride.destination}
                </a>
              </div>
              <div className="flex items-center gap-[0.3125rem]">
                <Typography className="font-normal text-xs w-20">תיאור הנסיעה:</Typography>
                <Typography className="min-w-0 break-words">{ride?.comment}</Typography>
              </div>
            </div>
          </div>
        </div>
        <SpecialRequestsChips specialRequests={ride.specialRequest || []} />
        <div className="flex gap-4 mt-3">
          {context === 'openCalls' && (
            <Button
              className="flex-1"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CarIcon />}
              onClick={onApprovePassenger}
            >
              פרטי נסיעה
            </Button>
          )}

          {context === 'myRides' && (
            <div className="flex flex-grow flex-row gap-4 mt-2">
              <Button
                variant="outlined"
                color="error"
                onClick={toggleConfirmCancelModal}
                className="flex-1"
              >
                ביטול
              </Button>
              <Button
                variant="contained"
                color="success"
                size="large"
                className="w-[12.8125rem]"
                startIcon={<CarIcon />}
                onClick={onOpenContactModal}
              >
                יציאה לדרך
              </Button>
            </div>
          )}
        </div>
        <ConfirmCancelRideModal
          open={confirmCancelModalOpen}
          onCancel={onCancel}
          onContinue={toggleConfirmCancelModal}
        />
      </CardContent>
    </Card>
  );
};
