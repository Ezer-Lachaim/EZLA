import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { CSSProperties, useEffect, useState } from 'react';
import withLayout from '../../components/LayoutHOC';
import { Configuration, Ride, RideApi } from '../../../api-client/index.ts';
import { BASE_API_URL } from '../../../Config.ts';

const ridesAPI = new RideApi(new Configuration({ basePath: BASE_API_URL }));

const Rides = () => {
  const [rides, setRides] = useState<Ride[]>();
  useEffect(() => {
    async function fetchData() {
      setRides(await ridesAPI.ridesGet());
    }
    fetchData();
  }, []);
  return (
    <div className="w-full h-full absolute top-0 bg-gray-200 overflow-auto">
      {rides?.map((ride) => (
        <Card className="m-3">
          <CardContent>
            <Typography variant="h6" component="div">
              {ride.driver?.city}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default withLayout(Rides, { title: 'קריאות פתוחות' });
