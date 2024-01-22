import { ColumnDef } from '@tanstack/react-table';
import { Check, Clear, Edit } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@mui/material';
import PageHeader from '../PageHeader/PageHeader';
import Table from '../../../Table/Table';
import { api } from '../../../../../services/api';
import { Driver } from '../../../../../api-client';
import AddCustomerModal from '../modals/AddCustomer/AddCustomerModal';
import { DRIVER_CAPABILITIES } from './Volunteers.constants';
import EditDriverModal from '../modals/EditDriverModal/EditDriverModal';

const columns: ColumnDef<Partial<Driver>>[] = [
  {
    accessorKey: 'signupDate',
    header: 'תאריך הרשמה',
    accessorFn: (data) => {
      if (!data.signupDate) return '-';
      return format(data.signupDate, 'HH:mm - dd/MM/yyyy');
    }
  },
  {
    accessorKey: 'name',
    header: 'שם מתנדב',
    accessorFn: (data) => {
      const fullName = `${data.firstName ?? ''} ${data.lastName ?? ''}`;
      if (!fullName.trim()) return '-';
      return fullName;
    }
  },
  { accessorKey: 'nationalId', header: 'ת.ז.', accessorFn: (data) => data.nationalId || '-' },
  { accessorKey: 'cellPhone', header: 'יצירת קשר', accessorFn: (data) => data.cellPhone || '-' },
  { accessorKey: 'email', header: 'אימייל', accessorFn: (data) => data.email },
  { accessorKey: 'city', header: 'עיר מגורים', accessorFn: (data) => data.city || '-' },
  {
    accessorKey: 'volunteeringArea',
    header: 'אזור התנדבות',
    accessorFn: (data) => data.volunteeringArea || '-'
  },
  {
    accessorKey: 'isValidLicense',
    header: 'רשיון נהיגה',
    accessorFn: (data) => data.isValidLicense,
    cell: (cell) => {
      return cell.getValue() ? <Check /> : <Clear />;
    }
  },
  {
    accessorKey: 'isValidCarLicense',
    header: 'רשיון רכב',
    accessorFn: (data) => data.isValidCarLicense,
    cell: (cell) => {
      return cell.getValue() ? <Check /> : <Clear />;
    }
  },
  {
    accessorKey: 'carManufacturer',
    header: 'סוג רכב',
    accessorFn: (data) => data.carManufacturer || '-'
  },
  { accessorKey: 'carColor', header: 'צבע רכב', accessorFn: (data) => data.carColor || '-' },
  {
    accessorKey: 'carPlateNumber',
    header: 'לוחית',
    accessorFn: (data) => data.carPlateNumber || '-'
  },
  {
    accessorKey: 'numOfSeats',
    header: 'מספר מושבים',
    accessorFn: (data) => data.numOfSeats || '-'
  },
  {
    accessorKey: 'carCapabilities',
    header: 'מיוחדים',
    accessorFn: (data) => {
      if (data.carCapabilities?.length) {
        return data.carCapabilities
          .map((capability) => {
            const capabilityItem = DRIVER_CAPABILITIES.find((item) => item.value === capability);
            return capabilityItem?.label || -'';
          })
          .join(', ');
      }
      return '-';
    }
  },
  { accessorKey: 'numOfDrives', header: 'נסיעות', accessorFn: (data) => data.numOfDrives || '-' },
  {
    accessorKey: 'actionEdit',
    header: '',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [toggleModal, setToggleModal] = useState(false);
      const handleModal = (shouldOpen: boolean) => setToggleModal(shouldOpen);

      const driver = row.original;

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
          <EditDriverModal open={toggleModal} handleModal={handleModal} driver={driver} />
        </div>
      );
    }
  }
];

const Volunteers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await api.driver.getAllDrivers();
      const sortedResultBySignupDate = response.sort(
        (a, b) => (b?.signupDate?.getTime() || 0) - (a?.signupDate?.getTime() || 0)
      );
      setDrivers(sortedResultBySignupDate);
    };

    fetchDrivers();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <PageHeader>
        <PageHeader.Title>מתנדבים ({drivers.length})</PageHeader.Title>
        <PageHeader.ActionButton onClick={() => setIsAddDriverModalOpen(true)}>
          הוספת מתנדב חדש
        </PageHeader.ActionButton>

        <AddCustomerModal open={isAddDriverModalOpen} handleModal={setIsAddDriverModalOpen} />
      </PageHeader>
      <Table data={drivers} columns={columns} />
    </div>
  );
};

export default Volunteers;
