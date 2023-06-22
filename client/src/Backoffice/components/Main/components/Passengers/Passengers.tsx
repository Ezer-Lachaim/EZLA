import { ColumnDef } from '@tanstack/react-table';
// import { Button, Stack } from '@mui/material';
import { OutlinedFlag, Flag } from '@mui/icons-material';
import PageHeader from '../PageHeader/PageHeader';
import Table from '../../../Table/Table';

type TempPassenger = (typeof passengersMock)[0];
const columns: ColumnDef<Partial<TempPassenger>>[] = [
  {
    accessorKey: 'registerationDate',
    header: 'תאריך הרשמה',
    accessorFn: (data) => data.registerationDate
  },
  { accessorKey: 'name', header: 'שם נוסע', accessorFn: (data) => data.name },
  { accessorKey: 'phoneNumber', header: 'יצירת קשר', accessorFn: (data) => data.phoneNumber },
  { accessorKey: 'email', header: 'אימייל', accessorFn: (data) => data.email },
  { accessorKey: 'address', header: 'כתובת איסוף', accessorFn: (data) => data.address },
  {
    accessorKey: 'reason',
    header: 'סיבת שימוש בהסעות',
    accessorFn: (data) => data.reason
  },
  { accessorKey: 'hospitalName', header: 'בית חולים', accessorFn: (data) => data.hospitalName },
  {
    accessorKey: 'startDate',
    header: 'תקופה',
    accessorFn: (data) => data.endDate,
    cell: () => {
      return <span className="ml-2 whitespace-nowrap">01/07/23 - 14/07/23</span>;
    }
  },
  {
    accessorKey: 'endDate',
    header: 'תוקף עד',
    accessorFn: (data) => data.endDate,
    cell: (cell) => {
      const isExpired = cell.row.index % 2 === 0;
      return (
        <div>
          {isExpired ? <Flag color="error" /> : <OutlinedFlag color="success" />}
          <span className="mr-4 whitespace-nowrap">14/07/23</span>
        </div>
      );
    }
  }
];

const Passengers = () => {
  return (
    <div>
      <PageHeader>
        <PageHeader.Title>נוסעים (189)</PageHeader.Title>
        <PageHeader.ActionButton>הוספת נוסע חדש</PageHeader.ActionButton>
      </PageHeader>
      <Table data={passengersMock} columns={columns} />
    </div>
  );
};

export default Passengers;

const passengersMock = [
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  },
  {
    registerationDate: '2023‐06‐21T16:02:18Z',
    name: 'ירון סולטן',
    phoneNumber: '0535305635',
    email: 'yaron.sultan@redis.com',
    address: 'ירושלים 87, אופקים',
    reason: 'ביקור חולה',
    hospitalName: 'אסף הרופא',
    startDate: '2023‐06‐21T16:02:18Z',
    endDate: '2023‐06‐28T16:02:18Z'
  }
];
