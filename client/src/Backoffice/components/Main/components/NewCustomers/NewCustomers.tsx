import { ColumnDef } from '@tanstack/react-table';
import { Button, Stack } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import PageHeader from '../PageHeader/PageHeader';
import Table from '../../../Table/Table';

type TempCustomer = (typeof customersMock)[0];
const columns: ColumnDef<Partial<TempCustomer>>[] = [
  { accessorKey: 'pendingTimeMs', header: 'זמן המתנה', accessorFn: (data) => data.pendingTimeMs },
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
    accessorKey: 'endDate',
    header: 'תקופה',
    accessorFn: (data) => data.endDate,
    cell: () => {
      return (
        <div className="flex gap-1 items-center">
          <span className="ml-2 whitespace-nowrap">01/07/23 - 14/07/23</span>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              color="error"
              style={{ minWidth: 0 }}
              className="w-7 h-7"
            >
              <Check fontSize="small" />
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="success"
              style={{ minWidth: 0 }}
              className="w-7 h-7"
            >
              <Close fontSize="small" />
            </Button>
          </Stack>
        </div>
      );
    }
  }
];

const NewCustomers = () => {
  return (
    <div>
      <PageHeader>
        <PageHeader.Title>נרשמים חדשים והארכות תוקף (3)</PageHeader.Title>
        <PageHeader.ActionButton>הוספת נוסע חדש</PageHeader.ActionButton>
      </PageHeader>
      <Table data={customersMock} columns={columns} />
    </div>
  );
};

export default NewCustomers;

const customersMock = [
  {
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
    pendingTimeMs: 12897371289,
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
