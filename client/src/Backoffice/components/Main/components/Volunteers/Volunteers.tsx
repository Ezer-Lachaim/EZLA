import { ColumnDef } from '@tanstack/react-table';
import { Check, Clear } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import PageHeader from '../PageHeader/PageHeader';
import Table from '../../../Table/Table';
import { api } from '../../../../../Config';
import { Driver } from '../../../../../api-client';
import AddCustomerModal from '../modals/AddCustomer/AddCustomerModal';

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
    accessorKey: 'volunteerArea',
    header: 'אזור התנדבות',
    accessorFn: (data) => data.volunteerArea || '-'
  },
  {
    accessorKey: 'hasDrivingLicense',
    header: 'רשיון נהיגה',
    accessorFn: (data) => data.hasDrivingLicense,
    cell: (cell) => {
      return cell.getValue() ? <Check /> : <Clear />;
    }
  },
  {
    accessorKey: 'hasCarLicense',
    header: 'רשיון רכב',
    accessorFn: (data) => data.hasCarLicense,
    cell: (cell) => {
      return cell.getValue() ? <Check /> : <Clear />;
    }
  },
  { accessorKey: 'carType', header: 'סוג רכב', accessorFn: (data) => data.carType },
  { accessorKey: 'carColor', header: 'צבע רכב', accessorFn: (data) => data.carColor },
  { accessorKey: 'carPlateNumber', header: 'לוחית', accessorFn: (data) => data.carPlateNumber },
  { accessorKey: 'carSeats', header: 'מספר מושבים', accessorFn: (data) => data.carSeats },
  {
    accessorKey: 'specialDescription',
    header: 'מיוחדים',
    accessorFn: (data) => data.specialDescription
  },
  { accessorKey: 'numberOfDrives', header: 'נסיעות', accessorFn: (data) => data.numberOfDrives }
];

const Volunteers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await api.driver.getAllDrivers();

      setDrivers(response);
    };
    fetchDrivers();
  }, []);

  return (
    <div>
      <PageHeader>
        <PageHeader.Title>מתנדבים ({drivers.length})</PageHeader.Title>
        <PageHeader.ActionButton onClick={() => setIsAddDriverModalOpen(true)}>
          הוספת מתנדב חדש
        </PageHeader.ActionButton>

        <AddCustomerModal
          customerType="volunteer"
          open={isAddDriverModalOpen}
          handleModal={setIsAddDriverModalOpen}
        />
      </PageHeader>
      <Table data={drivers} columns={columns} />
    </div>
  );
};

export default Volunteers;
