import { useCallback, useState } from 'react';
import { Button, Card, CardContent, Divider, Typography } from '@mui/material';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import PhoneIcon from '@mui/icons-material/LocalPhoneRounded';
import BellIcon from '@mui/icons-material/NotificationImportantRounded';
import { Ride } from '../../../../../api-client';
import { SpecialRequestsChips } from '../../../../components/SpecicalRequests/SpecialRequests';
import { formatPickupDateTime } from '../../../../../Backoffice/components/Main/components/TimeFunctions/TimeFunctions';
import RideContactModal from '../RideContactModal/RideContactModal';


export const commonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

export const commonTextStyle = {
  marginRight: '8px',
  fontFamily: 'Heebo',
  fontWeight: '400',
  fontSize: '12px',
  width: '80px'
};

export const boldTextStyle = {
  ...commonTextStyle,
  fontWeight: '700',
  fontSize: '16px',
  width: '315px'
};

export const RideCard = ({
  ride,
  context,
  onSelect,
  selected,
  onOpenContactModal,
  onApprovePassenger,
  rideId // New parameter to pass the ride ID
}: {
  ride: Ride;
  context: 'openCalls' | 'myRides';
  onSelect: (ride: Ride) => void;
  selected: boolean;
  onApprovePassenger: () => void;
  onOpenContactModal: () => void;
  rideId: string | undefined; // Define the rideId prop
}) => {



  return (
    <Card className="shadow-sm rounded-xl">
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Line 1: מועד איסוף */}
                  <div style={commonStyle}>
                    <Typography style={{ ...commonTextStyle, width: '80px' }}>
                      מועד איסוף:
                    </Typography>
                    <Typography style={boldTextStyle}>
                      {formatPickupDateTime(ride.pickupDateTime, ride.relevantTime)}
                    </Typography>
                  </div>

                  {/* Line 2: כמות */}
                  <div style={commonStyle}>
                    <Typography style={commonTextStyle}>כמות:</Typography>
                    <Typography style={boldTextStyle}>{ride.passengerCount}</Typography>
                  </div>

                  {/* Line 3: כתובת איסוף */}
                  <div style={commonStyle}>
                    <Typography style={commonTextStyle}>כתובת איסוף:</Typography>
                    <a
                      style={{ fontFamily: 'Heebo' }}
                      href={`https://waze.com/ul?q=${ride?.origin}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {ride?.origin}
                    </a>
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

                  {/* Line 5: תיאור הנסיעה */}
                  <div style={commonStyle}>
                    <Typography style={commonTextStyle}>תיאור הנסיעה:</Typography>
                    <Typography style={boldTextStyle}>{ride?.comment}</Typography>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <SpecialRequestsChips specialRequests={ride.specialRequest || []} />
          <>
            <div className="flex gap-4">
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
                  <Button variant="outlined" color="error" style={{ flex: 1 }}>
                    ביטול
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    style={{ width: "205px" }}
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
      </CardContent>
    </Card>
  );
};
