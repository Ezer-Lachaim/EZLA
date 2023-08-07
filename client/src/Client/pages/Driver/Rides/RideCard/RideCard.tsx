import { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardContent, Divider, Typography } from '@mui/material';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import PhoneIcon from '@mui/icons-material/LocalPhoneRounded';
import BellIcon from '@mui/icons-material/NotificationImportantRounded';
import { Ride } from '../../../../../api-client';
import { SpecialRequestsChips } from '../../../../components/SpecicalRequests/SpecialRequests';

export const RideCard = ({
  ride,
  onSelect,
  selected,
  onApprovePassenger
}: {
  ride: Ride;
  onSelect: (ride: Ride) => void;
  selected: boolean;
  onApprovePassenger: () => void;
}) => {
  const [rideWaitingTime, setRideWaitingTime] = useState('');

  const onClickCallback = useCallback(() => {
    onSelect(ride);
  }, [onSelect, ride]);

  useEffect(() => {
    const rideTime = ride?.requestTimeStamp?.getTime() || 0;
    setRideWaitingTime(new Date(new Date().getTime() - rideTime).toISOString().substring(11, 16));

    const timeInterval = setInterval(() => {
      setRideWaitingTime(new Date(new Date().getTime() - rideTime).toISOString().substring(11, 16));
    }, 60000);

    return () => clearInterval(timeInterval);
  }, [ride]);

  const isWaitingTimeTooLong = rideWaitingTime.slice(0, 2) !== '00';

  return (
    <Card className="shadow-sm rounded-xl">
      <CardContent onClick={onClickCallback} className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <Typography color="GrayText" variant="body2" component="div">
                המתנה:
              </Typography>
              <div className="flex items-center gap-1">
                <h1
                  className={`m-0 ${isWaitingTimeTooLong ? 'text-red-500' : 'text-black'} text-lg`}
                >
                  {rideWaitingTime}
                </h1>
                {isWaitingTimeTooLong && <BellIcon fontSize="small" className="fill-red-500" />}
              </div>
            </div>
            <div className="flex bg-green-500 rounded-full text-white items-center px-2 py-1">
              <p className="px-1 font-medium">{ride.passengerCount}</p>
              <EmojiPeopleRoundedIcon className="h-5" />
            </div>
          </div>
          <div className="flex">
            <div className="flex-row flex-1">
              <Typography color="GrayText" variant="body2" component="div">
                איסוף
              </Typography>
              <Typography variant="body1" component="div">
                {ride.origin}
              </Typography>
            </div>
            <div className="flex-row flex-1">
              <Typography color="GrayText" variant="body2" component="div">
                יעד
              </Typography>
              <Typography variant="body1" component="div">
                {ride.destination}
              </Typography>
            </div>
          </div>
          <SpecialRequestsChips specialRequests={ride.specialRequest || []} />
          {selected && (
            <>
              <Divider className="my-1" />
              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  variant="outlined"
                  size="large"
                  startIcon={<PhoneIcon />}
                  onClick={() => window.open(`tel:${ride?.cellphone}`)}
                >
                  צרו קשר
                </Button>
                <Button
                  className="flex-1"
                  size="large"
                  variant="contained"
                  startIcon={<CarIcon />}
                  onClick={onApprovePassenger}
                  color="secondary"
                >
                  צאו לדרך
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
