import { useCallback } from 'react';
import { Button, Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import { Ride, RideSpecialRequestEnum, RideStateEnum } from '../../../../../api-client';
import { api } from '../../../../../Config';
import { useUserContext } from '../../../../../context/UserContext/UserContext';

const specialMap = {
  [RideSpecialRequestEnum.WheelChair]: 'התאמה לכסא גלגלים',
  [RideSpecialRequestEnum.WheelChairStorage]: 'תא מטען מתאים לכסא גלגלים',
  [RideSpecialRequestEnum.BabyChair]: 'מושב בטיחות לתינוק',
  [RideSpecialRequestEnum.KidsChair]: 'מושב בטיחות לילדים (3-8)',
  [RideSpecialRequestEnum.AccessibleCar]: 'רכב גבוה',
  [RideSpecialRequestEnum.PatientDelivery]: 'משלוחים למאושפז'
};

const getLabel = (type: RideSpecialRequestEnum): string => specialMap[type];

export const RideCard = ({
  ride,
  onSelect,
  selected
}: {
  ride: Ride;
  onSelect: (ride: Ride) => void;
  selected: boolean;
}) => {
  const { user } = useUserContext();

  const onClickCallback = useCallback(() => {
    onSelect(ride);
  }, [onSelect, ride]);

  const selectRide = async () => {
    if (ride.state === RideStateEnum.WaitingForDriver) {
      await api.ride.updateRide({
        rideId: ride.rideId || '',
        ride: { ...ride, state: RideStateEnum.Booked, driver: { userId: user?.userId } }
      });
      console.log('Ride booked');
    }
  };

  return (
    <Card className="shadow-sm rounded-xl">
      <CardContent onClick={onClickCallback} className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between w-full">
            <Typography color="GrayText" variant="body2" component="div">
              המתנה:
            </Typography>
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
          <div className="flex flex-wrap gap-1">
            {Array.isArray(ride.specialRequest) &&
              Array.from(new Set(ride.specialRequest))?.map((req) => (
                <Chip
                  key={req}
                  className="ml-1 mt-1"
                  label={getLabel(req)}
                  variant="outlined"
                  color="primary"
                />
              ))}
          </div>
          {selected && (
            <>
              <Divider className="my-1" />
              <div className="flex gap-4">
                <Button className="flex-1" variant="outlined" size="large">
                  צרו קשר
                </Button>
                <Button
                  className="flex-1"
                  size="large"
                  variant="contained"
                  startIcon={<CarIcon />}
                  onClick={selectRide}
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
