import { ColumnDef } from '@tanstack/react-table';

import { OutlinedFlag, Flag } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { format, isValid, isBefore } from 'date-fns';
import PageHeader from '../PageHeader/PageHeader';
import Table from '../../../Table/Table';
import AddCustomerModal from '../modals/AddCustomer/AddCustomerModal';
import { GetHospitalList200ResponseInner, RideRequester } from '../../../../../api-client';
import { api } from '../../../../../Config';

const getPassengersColumns = (
  hospitals: GetHospitalList200ResponseInner[]
): ColumnDef<Partial<RideRequester>>[] => {
  return [
    {
      accessorKey: 'signupDate',
      header: 'תאריך הרשמה',
      accessorFn: (data) => {
        if (!isValid(data.signupDate)) return '-';
        return format(data.signupDate!, 'dd/MM/yyyy');
      }
    },
    {
      accessorKey: 'firstName',
      header: 'שם נוסע',
      accessorFn: (data) => {
        const fullName = `${data?.patient?.firstName ?? ''} ${data?.patient?.lastName ?? ''}`;
        if (!fullName.trim()) return '-';
        return fullName;
      }
    },
    {
      accessorKey: 'phoneNumber',
      header: 'יצירת קשר',
      accessorFn: (data) => data?.passengerCellPhone || data?.cellPhone || '-'
    },
    { accessorKey: 'email', header: 'אימייל', accessorFn: (data) => data.email },
    { accessorKey: 'address', header: 'כתובת איסוף', accessorFn: (data) => data.address },
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
      accessorKey: 'startServiceDate',
      header: 'תקופה',
      cell: ({ row }) => {
        if (!isValid(row.original.startServiceDate) || !isValid(row.original.endServiceDate)) {
          return '-';
        }

        return (
          <span className="ml-2 whitespace-nowrap">
            {format(row.original.startServiceDate!, 'dd/MM/yyyy')} -
            {format(row.original.endServiceDate!, 'dd/MM/yyyy')}
          </span>
        );
      }
    },
    {
      accessorKey: 'endServiceDate',
      header: 'תוקף עד',
      cell: ({ row }) => {
        if (!isValid(row.original.endServiceDate)) return '-';
        const isExpired = isBefore(row.original.endServiceDate!, new Date());

        if (isExpired) {
          return (
            <div>
              <Flag color="error" />
              <span className="mr-4 whitespace-nowrap">פג תוקף</span>
            </div>
          );
        }

        return (
          <div>
            {isExpired ? <Flag color="error" /> : <OutlinedFlag color="success" />}
            <span className="mr-4 whitespace-nowrap">
              {format(row.original.endServiceDate!, 'dd/MM/yyyy')}
            </span>
          </div>
        );
      }
    }
  ];
};

const Passengers = () => {
  const [passengers, setPassengers] = useState<RideRequester[]>([]);
  const [hospitals, setHospitals] = useState<GetHospitalList200ResponseInner[]>([]);
  const columns = getPassengersColumns(hospitals);
  const [isAddPassengerModalOpen, setIsAddPassengerModalOpen] = useState(false);

  useEffect(() => {
    const fetchPassengers = async () => {
      const result = await api.user.getUsers({
        state: 'Approved',
        role: 'Requester'
      });

      setPassengers(result);
    };
    const fetchHospitals = async () => {
      const result = await api.hospital.getHospitalList();
      setHospitals(result);
    };
    fetchPassengers();
    fetchHospitals();
  }, [setPassengers]);
  return (
    <div>
      <PageHeader>
        <PageHeader.Title>נוסעים ({passengers.length})</PageHeader.Title>

        <PageHeader.ActionButton onClick={() => setIsAddPassengerModalOpen(false)}>
          הוספת נוסע חדש
        </PageHeader.ActionButton>
      </PageHeader>
      <Table data={passengers} columns={columns} />
      {/* Modal not ready for passenger */}
      <AddCustomerModal
        customerType="volunteer"
        open={isAddPassengerModalOpen}
        handleModal={setIsAddPassengerModalOpen}
      />
    </div>
  );
};

export default Passengers;
