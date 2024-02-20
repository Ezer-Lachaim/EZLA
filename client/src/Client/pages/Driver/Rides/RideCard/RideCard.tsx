import { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import { Ride, RideStateEnum } from '../../../../../api-client';
import { SpecialRequestsChips } from '../../../../components/SpecicalRequests/SpecialRequests';
import { useActiveRide } from '../../../../../hooks/activeRide';
import { api } from '../../../../../services/api';
import ConfirmCancelRideModal from '../../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal';
import { formatPickupDateTime } from '../../../../components/TimeFunctions/TimeFunctions';

const commonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  width: '100%'
};
const commonTextStyle = {
  fontFamily: 'Heebo',
  fontWeight: '400',
  fontSize: '12px',
  width: '80px',
  gap: '5px'
};

const boldTextStyle = {
  ...commonTextStyle,
  fontWeight: '700',
  fontSize: '16px',
  width: '100%'
};

export const RideCard = ({
  ride,
  context,
  onOpenContactModal,
  onApprovePassenger
}: {
  ride: Ride;
  context: 'openCalls' | 'myRides';
  onSelect: (ride: Ride) => void;
  selected: boolean;
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
    }
  };

  return (
    <Card className="shadow-sm rounded-xl">
      <CardContent>
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
                    <Typography style={boldTextStyle}>{ride.passengerCount}</Typography>
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
