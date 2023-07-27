import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Beenhere, DirectionsCarFilled } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Ride, RideStateEnum } from '../../../../api-client';
import { api } from '../../../../Config.ts';

const Riding = () => {
  const [ride, setRide] = useState<Ride>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setRide(await api.ride.getActiveRideForUser());
    })();
  }, []);

  const onComplete = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { ...ride, state: RideStateEnum.Completed }
    });
    console.log('Completed');

    navigate('/driver/completed');
  };

  return (
    <div className="w-full overflow-auto">
      <div className="bg-yellow-300 text-center rounded-md">
        <DirectionsCarFilled className="fill-orange-600" />
        <p>בדרך ליעד </p>
      </div>
      <p className="text-center mt-4">{`זמן הגעה משוער ${ride?.destinationArrivalTime}`}</p>
      <div>
        <b className="mt-4">שם הנוסע</b>
        <p>{`${ride?.rideRequester?.firstName} ${ride?.rideRequester?.lastName}`}</p>
        <b>כתובת יעד</b>
        <p>{ride?.destination}</p>
        <b>בקשות מיוחדות</b>
        {ride?.specialRequest?.map((specialRequest) => (
          <p>{specialRequest}</p>
        ))}
      </div>

      <p>אנא עדכנו כאשר הנסיעה הסתיימה</p>

      <Button variant="contained" onClick={onComplete}>
        <Beenhere />
        הנסיעה הסתיימה
      </Button>
    </div>
  );
};

export default withLayout(Riding, { title: 'נסיעה פעילה', showLogoutButton: true });
