import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { format, formatDistance } from 'date-fns';
import heLocale from 'date-fns/locale/he';
import { Button } from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import PageHeader from '../PageHeader/PageHeader';
import Table from '../../../Table/Table';
import { api } from '../../../../../services/api';
import { Ride } from '../../../../../api-client';
import { RIDE_STATE_MAPPER } from './Rides.constants';
import AddRideModal from '../modals/AddRide/AddRideModal.tsx';
import CancelRideModal from '../modals/CancelRideModal/CancelRideModal.tsx';
import EditRideModal from '../modals/EditRideModal/EditRideModal.tsx';

const columns: ColumnDef<Partial<Ride>>[] = [
  {
    accessorKey: 'requestTimeStamp',
    header: 'תאריך ושעת הזמנה ',
    accessorFn: (data) => {
      if (!data.requestTimeStamp) return '-';
      return format(data.requestTimeStamp, 'dd/MM/yyyy HH:mm');
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
      const fullName = `${(data.firstName || data.rideRequester?.firstName) ?? ''} ${
        (data.lastName || data.rideRequester?.lastName) ?? ''
      }`;
      if (!fullName.trim()) return '-';
      return fullName;
    }
  },
  {
    accessorKey: 'cellphone',
    header: 'טלפון',
    accessorFn: (data) => data.cellphone || '-'
  },
  {
    accessorKey: 'origin',
    header: 'כתובת איסוף',
    accessorFn: (data) => data.origin || '-'
  },
  {
    accessorKey: 'destination',
    header: 'יעד נסיעה',
    accessorFn: (data) => data.destination || '-'
  },
  {
    accessorKey: 'passengerCount',
    header: "מס' נוסעים",
    accessorFn: (data) => data.passengerCount || '-'
  },
  {
    accessorKey: 'comment',
    header: 'תיאור נסיעה',
    accessorFn: (data) => data.comment || '-'
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
    accessorKey: 'period',
    header: 'משך התהליך',
    accessorFn: (data) => {
      if (!data.requestTimeStamp || !data.completedTimeStamp) return '-';

      return formatDistance(data.completedTimeStamp, data.requestTimeStamp, {
        locale: heLocale
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
  },
  {
    accessorKey: 'actions2',
    header: '',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [toggleModal, setToggleModal] = useState(false);
      const handleModal = (shouldOpen: boolean) => setToggleModal(shouldOpen);

      const ride = row.original;

      if (row.original.state !== 'WaitingForDriver') return null;

      return (
        <div className="flex gap-1 items-center">
          <Button
            size="small"
            variant="outlined"
            color="error"
            style={{ minWidth: 0 }}
            className="w-7 h-7"
            onClick={() => handleModal(true)}
          >
            <Edit fontSize="small" />
          </Button>
          <EditRideModal open={toggleModal} handleModal={handleModal} ride={ride} />
        </div>
      );
    }
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [toggleModal, setToggleModal] = useState(false);
      const handleModal = (shouldOpen: boolean) => setToggleModal(shouldOpen);

      if (row.original.state !== 'WaitingForDriver') return null;

      return (
        <div className="flex gap-1 items-center">
          <Button
            size="small"
            variant="outlined"
            color="error"
            style={{ minWidth: 0 }}
            className="w-7 h-7"
            onClick={() => handleModal(true)}
          >
            <Close fontSize="small" />
          </Button>
          <CancelRideModal
            rideId={row.original.rideId || ''}
            open={toggleModal}
            handleModal={handleModal}
          />
        </div>
      );
    }
  }
];

const Rides = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [isAddRideModalOpen, setIsAddRideModalOpen] = useState(false);

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
    <div className="flex flex-col flex-grow">
      <PageHeader>
        <PageHeader.Title>נסיעות ({rides?.length})</PageHeader.Title>

        <PageHeader.ActionButton onClick={() => setIsAddRideModalOpen(true)}>
          נסיעה חדשה
        </PageHeader.ActionButton>

        <AddRideModal open={isAddRideModalOpen} handleModal={setIsAddRideModalOpen} />
      </PageHeader>
      <Table data={rides} columns={columns} />
    </div>
  );
};

export default Rides;
