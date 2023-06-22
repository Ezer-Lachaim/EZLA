import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useEffect, useState, useCallback } from 'react';
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';
import withLayout from '../../components/LayoutHOC';
import { Configuration, Ride, RideApi, RideSpecialRequestEnum } from '../../../api-client/index.ts';
import { BASE_API_URL } from '../../../Config.ts';

const ridesAPI = new RideApi(new Configuration({ basePath: BASE_API_URL }));

const specialMap = {
  [RideSpecialRequestEnum.WheelChair]: 'התאמה לכסא גלגלים',
  [RideSpecialRequestEnum.WheelChairStorage]: 'תא מטען מתאים לכסא גלגלים',
  [RideSpecialRequestEnum.BabyChair]: 'מושב בטיחות לתינוק',
  [RideSpecialRequestEnum.KidsChair]: 'מושב בטיחות לילדים (3-8)',
  [RideSpecialRequestEnum.AccessibleCar]: 'רכב גבוה',
  [RideSpecialRequestEnum.PatientDelivery]: 'משלוחים למאושפז'
};

const getLabel = (type: RideSpecialRequestEnum): string => specialMap[type];

const RideCard = ({
  ride,
  onSelect,
  selected
}: {
  ride: Ride;
  onSelect: (ride: Ride) => void;
  selected: boolean;
}) => {
  const onClickCallback = useCallback(() => {
    onSelect(ride);
  }, [onSelect, ride]);
  return (
    <Card className="m-3">
      <CardContent onClick={onClickCallback}>
        <div className="flex-col">
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
          <div className="flex-col">
            {Array.from(new Set(ride.specialRequest))?.map((req) => (
              <Chip
                className="ml-1 mt-1"
                label={getLabel(req)}
                variant="outlined"
                color="primary"
              />
            ))}
          </div>
          {selected && (
            <div className="flex mt-2">
              <Button className="flex-1 flex-col m-1" variant="outlined">
                צרו קשר
              </Button>
              <Button className="flex-1 flex-col m-1" variant="contained">
                צאו לדרך
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Rides = () => {
  const [rides, setRides] = useState<Ride[]>();
  useEffect(() => {
    async function fetchData() {
      setRides(await ridesAPI.ridesGet());
    }
    fetchData();
  }, []);
  const [selectedRide, setSelectedRide] = useState<Ride>();
  const onSelectRideCallback = useCallback((ride: Ride) => {
    setSelectedRide(ride);
  }, []);
  return (
    <div className="w-full h-full absolute top-0 bg-gray-200 overflow-auto">
      {rides?.map((ride, index) => (
        <RideCard
          ride={ride}
          key={`ride-${index}`}
          onSelect={onSelectRideCallback}
          selected={selectedRide === ride}
        />
      ))}
    </div>
  );
};

export default withLayout(Rides, { title: 'קריאות פתוחות' });
