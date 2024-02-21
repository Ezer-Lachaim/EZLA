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
  gap: '5px'
};
const commonTextStyle = {
  fontFamily: 'Heebo',
  fontWeight: '400',
  fontSize: '12px',
  width: '80px'
};

const boldTextStyle: React.CSSProperties = {
  ...commonTextStyle,
  fontWeight: '700',
  fontSize: '16px',
  width: '100%',
  minWidth: '0',
  wordWrap: 'break-word'
};

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
        <div className="flex flex-col w-full h-full gap-8px m-20px">
          <div className="flex justify-between w-full">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <div style={commonStyle}>
                <Typography style={{ ...commonTextStyle, width: '80px' }}>מועד איסוף:</Typography>
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
                <a
                  style={{
                    fontFamily: 'Heebo',
                    alignContent: 'right',
                    minWidth: '0',
                    wordWrap: 'break-word'
                  }}
                  href={`https://waze.com/ul?q=${ride?.origin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ride?.origin}
                </a>
              </div>

              <div style={commonStyle}>
                <Typography style={commonTextStyle}>יעד נסיעה:</Typography>
                <a
                  style={{ minWidth: '0', wordWrap: 'break-word' }}
                  href={`https://waze.com/ul?q=${ride.destination}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ride.destination}
                </a>
              </div>
              <div style={commonStyle}>
                <Typography style={commonTextStyle}>תיאור הנסיעה:</Typography>
                <Typography style={{ minWidth: '0', wordWrap: 'break-word' }}>
                  {ride?.comment}
                </Typography>
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
        <ConfirmCancelRideModal
          open={confirmCancelModalOpen}
          onCancel={onCancel}
          onContinue={toggleConfirmCancelModal}
        />
      </CardContent>
    </Card>
  );
};
