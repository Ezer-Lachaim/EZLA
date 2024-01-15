import { format, intlFormatDistance, isValid } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import { Button, Stack } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import Table from '../../../Table/Table';
import RejectCustomerModal from '../modals/RejectCustomerModal/RejectCustomerModal';
import { api } from '../../../../../services/api';
import { Hospital, RideRequester } from '../../../../../api-client';

const getNewCustomersColumns = (hospitals: Hospital[]): ColumnDef<Partial<RideRequester>>[] => {
  return [
    {
      accessorKey: 'pendingTime',
      header: 'זמן המתנה',
      accessorFn: (data) => {
        if (!data.signupDate) return '-';
        return intlFormatDistance(data.signupDate, Date.now(), {
          locale: 'he',
          style: 'narrow',
          numeric: 'always'
        });
      }
    },
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
      header: 'שם נוסע',
      accessorFn: (data) => {
        const fullName = `${data.firstName ?? ''} ${data.lastName ?? ''}`;
        if (!fullName.trim()) return '-';

        return fullName;
      }
    },
    {
      accessorKey: 'phoneNumber',
      header: 'יצירת קשר',
      accessorFn: (data) => data.cellPhone || '-'
    },
    { accessorKey: 'email', header: 'אימייל', accessorFn: (data) => data.email },
    { accessorKey: 'address', header: 'כתובת איסוף', accessorFn: (data) => data.address || '-' },
    {
      accessorKey: 'reason',
      header: 'סיבת שימוש בהסעות',
      accessorFn: (data) => data.patient?.message || '-'
    },
    {
      accessorKey: 'hospitalName',
      header: 'בית חולים',
      accessorFn: (data) => {
        const patientHospital = hospitals?.find(
          (hospital) => hospital.id === data.patient?.hospitalId
        );
        if (!patientHospital) return '-';

        return patientHospital.name;
      }
    },
    {
      accessorKey: 'endServiceDate',
      header: 'תקופה',
      cell: ({ row }) => {
        if (!isValid(row.original.startServiceDate) || !isValid(row.original.endServiceDate)) {
          return '-';
        }

        return (
          <span className="ml-2 whitespace-nowrap">
            {row.original.startServiceDate && format(row.original.startServiceDate, 'dd/MM/yyyy')} -
            {row.original.endServiceDate && format(row.original.endServiceDate, 'dd/MM/yyyy')}
          </span>
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
        return (
          <div className="flex gap-1 items-center">
            <Stack direction="row" spacing={1}>
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
              <Button
                size="small"
                variant="outlined"
                color="success"
                style={{ minWidth: 0 }}
                className="w-7 h-7"
                onClick={async () => {
                  await api.user.updateUser({
                    userId: row.original.userId || '',
                    rideRequester: { registrationState: 'Approved' }
                  });

                  window.location.reload();
                }}
              >
                <Check fontSize="small" />
              </Button>
            </Stack>
            <RejectCustomerModal
              userId={row.original.userId ?? ''}
              open={toggleModal}
              handleModal={handleModal}
            />
          </div>
        );
      }
    }
  ];
};

const NewCustomers = () => {
  const [pendingUsers, setPendingUsers] = useState<RideRequester[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const columns = getNewCustomersColumns(hospitals);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const result = await api.user.getUsers({
        state: 'Pending',
        role: 'Requester'
      });
      const sortedResultBySignupDate = result.sort(
        (a, b) => (b?.signupDate?.getTime() || 0) - (a?.signupDate?.getTime() || 0)
      );
      setPendingUsers(sortedResultBySignupDate);
    };
    const fetchHospitals = async () => {
      const result = await api.hospital.getHospitalList();
      setHospitals(result);
    };

    fetchPendingUsers();
    fetchHospitals();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <PageHeader>
        <PageHeader.Title>נרשמים חדשים והארכות תוקף ({pendingUsers.length})</PageHeader.Title>
        <PageHeader.ActionButton disabled>הוספת נוסע חדש</PageHeader.ActionButton>
      </PageHeader>
      <Table data={pendingUsers} columns={columns} />
    </div>
  );
};

export default NewCustomers;
