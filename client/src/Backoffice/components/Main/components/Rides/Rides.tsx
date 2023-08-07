import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { format, intlFormatDistance } from 'date-fns';
import PageHeader from '../PageHeader/PageHeader';
import Table from '../../../Table/Table';
import { api } from '../../../../../Config';
import { Ride } from '../../../../../api-client';
import { RIDE_STATE_MAPPER } from './Rides.constants';

const columns: ColumnDef<Partial<Ride>>[] = [
  {
    accessorKey: 'requestTimeStamp',
    header: 'תאריך',
    accessorFn: (data) => {
      if (!data.requestTimeStamp) return '-';
      return format(data.requestTimeStamp, 'dd/MM/yyyy');
    }
  },
  {
    accessorKey: 'rideId',
    header: 'שעה',
    accessorFn: (data) => {
      if (!data.requestTimeStamp) return '-';
      return format(data.requestTimeStamp, 'HH:mm');
    }
  },
  {
    accessorKey: 'driver.firstName',
    header: 'שם נהג',
    accessorFn: (data) => {
      const fullName = `${data.driver?.firstName ?? ''} ${data.driver?.lastName ?? ''}`;
      if (!fullName.trim()) return '-';
      return fullName;
    }
  },
  {
    accessorKey: 'rideRequester.firstName',
    header: 'שם נוסע',
    accessorFn: (data) => {
      const fullName = `${data.rideRequester?.firstName ?? ''} ${
        data.rideRequester?.lastName ?? ''
      }`;
      if (!fullName.trim()) return '-';
      return fullName;
    }
  },
  { accessorKey: 'origin', header: 'כתובת איסוף', accessorFn: (data) => data.origin || '-' },
  {
    accessorKey: 'destination',
    header: 'יעד נסיעה',
    accessorFn: (data) => data.destination || '-'
  },
  {
    accessorKey: 'completedTimeStamp',
    header: 'זמן סיום',
    accessorFn: (data) => {
      if (!data.completedTimeStamp) return '-';

      return format(data.completedTimeStamp, 'HH:mm - dd/MM/yyyy');
    }
  },
  {
    accessorKey: 'cellphone',
    header: 'משך התהליך',
    accessorFn: (data) => {
      if (!data.requestTimeStamp || !data.completedTimeStamp) return '-';
      return intlFormatDistance(data.requestTimeStamp, data.completedTimeStamp, {
        locale: 'he',
        style: 'narrow',
        numeric: 'always'
      });
    }
  },
  {
    accessorKey: 'state',
    header: 'סטטוס',
    accessorFn: (data) => {
      if (!data.state) return '-';
      return RIDE_STATE_MAPPER[data.state];
    }
  }
];

const Rides = () => {
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    const fetchRides = async () => {
      const response = await api.ride.ridesGet();

      const sortedRides = response.sort((a, b) => {
        if (!a.requestTimeStamp) return 1;
        if (!b.requestTimeStamp) return -1;

        return new Date(b.requestTimeStamp).getTime() - new Date(a.requestTimeStamp).getTime();
      });
      setRides(sortedRides);
    };
    fetchRides();
  }, []);

  return (
    <div>
      <PageHeader>
        <PageHeader.Title>נסיעות ({rides?.length})</PageHeader.Title>
      </PageHeader>
      <Table data={rides} columns={columns} />
    </div>
  );
};

export default Rides;
