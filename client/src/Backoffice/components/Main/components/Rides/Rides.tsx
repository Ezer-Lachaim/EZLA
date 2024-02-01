import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { format, formatDistance } from 'date-fns';
import heLocale from 'date-fns/locale/he';
import { Button, Chip, Avatar, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PageHeader from '../PageHeader/PageHeader';
import Table from '../../../Table/Table';
import { api } from '../../../../../services/api';
import { Ride } from '../../../../../api-client';
import {
  RIDE_REQUEST,
  RIDE_STATE_MAPPER,
  getStateIcon,
  getStateIconColor
} from './Rides.constants';
import AddRideModal from '../modals/AddRide/AddRideModal.tsx';
import CancelRideModal from '../modals/CancelRideModal/CancelRideModal.tsx';
import EditRideModal from '../modals/EditRideModal/EditRideModal.tsx';

const columns: ColumnDef<Partial<Ride>>[] = [
  {
    accessorKey: 'requestTimeStamp',
    header: 'מועד איסוף',
    accessorFn: (data) => {
      if (!data.requestTimeStamp) return '-';
      return format(data.requestTimeStamp, 'dd/MM/yyyy HH:mm');
    }
  },
  {
    accessorKey: 'driver.firstName',
    header: 'שם מתנדב',
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
<<<<<<< HEAD
<<<<<<< HEAD
    header: 'טלפון',
=======
    header: 'טלפון ליצירת קשר',
>>>>>>> 355b00d (Backoffice menu design according to figma)
    cell: ({ row }) => {
      const { cellphone } = row.original;
      return cellphone ? (
        <a
          href={`https://wa.me/972${cellphone.replace(/-/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon className="ml-2" style={{ color: '#2563EB', fontSize: '22px' }} />
          {cellphone}
        </a>
      ) : (
        '-'
      );
    }
=======
    header: 'טלפון ליצירת קשר',
    accessorFn: (data) => data.cellphone || '-'
>>>>>>> 57a4c05 (modify the header names)
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
    header: "נוסעים/ ארגזים",
    accessorFn: (data) => data.passengerCount || '-'
  },
  {
    accessorKey: 'comment',
    header: 'תיאור הנסיעה',
    accessorFn: (data) => data.comment || '-'
  },
  {
    accessorKey: 'carCapabilities',
    header: 'בקשות מיוחדות',
    accessorFn: (data) => {
      if (data.specialRequest?.length) {
        return data.specialRequest
          .map((capability) => {
            const capabilityItem = RIDE_REQUEST.find((item) => item.value === capability);
            return capabilityItem?.label || -'';
          })
          .join(', ');
      }
      return '-';
    }
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
    cell: ({ row }) => {
      if (!row.original.state) return null;

      const icon = getStateIcon(row.original.state);
      const label = RIDE_STATE_MAPPER[row.original.state];
      const backgroundColor = getStateIconColor(row.original.state);

      return (
        <Chip
          avatar={
            <Avatar style={{ backgroundColor, color: '#fff', borderRadius: '50px' }}>{icon}</Avatar>
          }
          label={
            <Typography
              style={{
                color: 'var(--Text-color-Dark-Mode-Primary, #FFF)',
                textAlign: 'right',
                fontFamily: 'Heebo',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '100%',
                whiteSpace: 'normal'
              }}
            >
              {label}
            </Typography>
          }
          style={{
            backgroundColor,
            width: '100px',
            padding: '3px 5px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            flex: '1 0 0'
          }}
        />
      );
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
            variant="text"
            color="error"
            style={{ minWidth: 0 }}
            className="w-7 h-7"
            onClick={() => handleModal(true)}
          >
            <EditIcon style={{ color: '#0000008A', fontSize: '24px' }} />
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
            variant="text"
            color="error"
            style={{ minWidth: 0 }}
            className="w-7 h-7"
            onClick={() => handleModal(true)}
          >
            <DeleteForeverIcon style={{ color: '#0000008A', fontSize: '24px' }} />
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
