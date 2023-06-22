import { ColumnDef } from '@tanstack/react-table';
import { Check, Clear } from '@mui/icons-material';
import PageHeader from '../PageHeader/PageHeader';
import Table from '../../../Table/Table';

type TempPassenger = (typeof volunteersMock)[0];
const columns: ColumnDef<Partial<TempPassenger>>[] = [
  {
    accessorKey: 'registerationDate',
    header: 'תאריך הרשמה',
    accessorFn: (data) => data.registerationDate
  },
  { accessorKey: 'name', header: 'שם מתנדב', accessorFn: (data) => data.name },
  { accessorKey: 'idNumber', header: 'ת.ז.', accessorFn: (data) => data.idNumber },
  { accessorKey: 'phoneNumber', header: 'יצירת קשר', accessorFn: (data) => data.phoneNumber },
  { accessorKey: 'email', header: 'אימייל', accessorFn: (data) => data.email },
  { accessorKey: 'city', header: 'עיר מגורים', accessorFn: (data) => data.city },
  {
    accessorKey: 'volunteerArea',
    header: 'אזור התנדבות',
    accessorFn: (data) => data.volunteerArea
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
  return (
    <div>
      <PageHeader>
        <PageHeader.Title>מתנדבים (57)</PageHeader.Title>
        <PageHeader.ActionButton>הוספת מתנדב חדש</PageHeader.ActionButton>
      </PageHeader>
      <Table data={volunteersMock} columns={columns} />
    </div>
  );
};

export default Volunteers;

const volunteersMock = [
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    idNumber: '73892748',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    city: 'אופקים',
    volunteerArea: 'הדרום',
    hasDrivingLicense: true,
    hasCarLicense: false,
    carType: 'טויוטה קורולה 19',
    carColor: 'ירוק בקבוק',
    carPlateNumber: '85-122-31',
    carSeats: 4,
    specialDescription: 'מושב בטיחות לתינוק, מושב בטיחות לילדים ומלא מלא מלא מקום בתא המטען',
    numberOfDrives: 4
  }
];
