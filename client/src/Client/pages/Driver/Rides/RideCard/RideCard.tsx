import { Button, Card, CardContent, Divider, Typography } from '@mui/material';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import { Ride, RideStateEnum } from '../../../../../api-client';
import { SpecialRequestsChips } from '../../../../components/SpecicalRequests/SpecialRequests';
import { formatPickupDateTime } from '../../../../../Backoffice/components/Main/components/TimeFunctions/TimeFunctions';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConfirmCancelRideModal from '../../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal';
import { useState } from 'react';
import { useActiveRide } from '../../../../../hooks/activeRide';
import { api } from '../../../../../services/api';

export const commonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

export const commonTextStyle = {
  fontFamily: 'Heebo',
  fontWeight: '400',
  fontSize: '12px',
  width: '80px'
};

export const boldTextStyle = {
  ...commonTextStyle,
  fontWeight: '700',
  fontSize: '16px',
  width: '100%'
};

export const RideCard = ({
  ride,
  context,
  onOpenContactModal,
  onApprovePassenger,
}: {
  ride: Ride;
  context: 'openCalls' | 'myRides';
  onSelect: (ride: Ride) => void;
  selected: boolean;
  onApprovePassenger: () => void;
  onOpenContactModal: () => void;
  rideId: string | undefined; // Define the rideId prop
}) => {
  const { reFetch: reFetchActiveRide } = useActiveRide();
  const [confirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);

  const toggleConfirmCancelModal = () => {
    setConfirmCancelModalOpen(!confirmCancelModalOpen);
  };

  const onCancel = async () => {
    if (!ride || !ride.rideId) {
      console.error('Invalid ride data. Ride ID is missing.');
      return;
    }  
    try {
      await api.ride.updateRide({
        rideId: ride.rideId,
        ride: { state: RideStateEnum.DriverCanceled }
      });
      await reFetchActiveRide();
      // navigation will occur automatically (in @../Driver.tsx)
    } catch (error) {
      console.error('Error canceling ride:', error);
      // Handle error as needed
    }
  };
  
  return (
    <Card className="shadow-sm rounded-xl">
      <CardContent >
        <div className="flex flex-col">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={commonStyle}>
                    <Typography style={{ ...commonTextStyle, width: '80px' }}>
                      מועד איסוף:
                    </Typography>
                    <Typography style={boldTextStyle}>
                      {formatPickupDateTime(ride.pickupDateTime, ride.relevantTime)}
                    </Typography>
                  </div>
                  <div style={commonStyle}>
                    <Typography style={commonTextStyle}>כמות:</Typography>
                    <Typography>
                      {ride.serviceType === 'ride' ? (
                        <span className="ml-2">
                          <EmojiPeopleIcon />
                        </span>
                      ) : (
                        <span className="ml-2">
                          <InventoryIcon />
                        </span>
                      )}
                      {ride.passengerCount}
                    </Typography>
                  </div>
                  {context === 'myRides' && (
                    <>
                      <div style={commonStyle}>
                        <Typography style={commonTextStyle}>שם הנוסע:</Typography>
                        <Typography style={boldTextStyle}>
                          {ride?.firstName} {ride?.lastName}
                        </Typography>
                      </div>
                      <div style={commonStyle}>
                        <Typography style={commonTextStyle}>טלפון:</Typography>
                        <Typography>
                          {' '}
                          <a
                            href={`https://wa.me/972${ride?.cellphone?.replace(/-/g, '')}`} // Use optional chaining
                            target="_blank"
                            rel="noreferrer"
                          >
                            {ride?.cellphone}
                          </a>{' '}
                        </Typography>{' '}
                      </div>
                    </>
                  )}
                  <div style={commonStyle}>
                    <Typography style={commonTextStyle}>כתובת איסוף:</Typography>
                    <Typography style={{ width: '10999px' }}>
                      <a
                        style={{ fontFamily: 'Heebo', alignContent: 'right' }}
                        href={`https://waze.com/ul?q=${ride?.origin}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {ride?.origin}
                      </a>
                    </Typography>
                  </div>

                  {/* Line 4: יעד נסיעה */}
                  <div style={commonStyle}>
                    <Typography style={commonTextStyle}>יעד נסיעה:</Typography>
                    <a
                      style={{ fontFamily: 'Heebo' }}
                      href={`https://waze.com/ul?q=${ride.destination}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {ride.destination}
                    </a>
                  </div>
                  <div style={commonStyle}>
                    <Typography style={commonTextStyle}>תיאור הנסיעה:</Typography>
                    <Typography>{ride?.comment}</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SpecialRequestsChips specialRequests={ride.specialRequest || []} />
          <>
            <Divider />
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
                <div className="flex flex-grow flex-row gap-4">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={toggleConfirmCancelModal} // Open ConfirmCancelRideModal
                    style={{ flex: 1 }}
                  >
                    ביטול
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    style={{ width: '205px' }}
                    startIcon={<CarIcon />}
                    onClick={onOpenContactModal}
                  >
                    יציאה לדרך
                  </Button>
                </div>
              )}
            </div>
          </>
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
