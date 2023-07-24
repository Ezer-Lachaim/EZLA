import { useEffect, useState } from 'react';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Ride } from '../../../../api-client';
import { api } from '../../../../Config.ts';

const ActiveRide = () => {
  const [ride, setRide] = useState<Ride>();
  useEffect(() => {
    (async () => {
      setRide(await api.ride.getActiveRideForUser());
    })();
  }, []);

  return (
    <div className="w-full h-full absolute top-0 bg-gray-200 overflow-auto">
      {JSON.stringify(ride)}
    </div>
  );
};

export default withLayout(ActiveRide, { title: 'נסיעה פעילה', showLogoutButton: true });
