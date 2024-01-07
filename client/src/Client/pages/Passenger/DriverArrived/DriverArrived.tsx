import { Phone, CheckCircle } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useActiveRide } from '../../../../hooks/activeRide';
import withLayout from '../../../components/LayoutHOC.tsx';
import { ViewField } from '../../../components/ViewField/ViewField.tsx';
import { SpecialRequestsChips } from '../../../components/SpecicalRequests/SpecialRequests.tsx';

const DriverArrived = () => {
  const { activeRide: ride } = useActiveRide();

  return (
    <div className="w-full pb-5 h-full flex flex-col">
      <Box
        sx={{ background: '#4CAF501A' }}
        className="rounded-md flex items-center flex-col py-4 gap-2"
      >
        <CheckCircle sx={{ fill: '#4CAF50' }} fontSize="large" />
        <h1 className="font-medium m-0" style={{ color: '#4CAF50' }}>
          ההסעה הגיעה!
        </h1>
      </Box>
      <h1 className="text-center">המתנדב ממתין לכם</h1>
      <div className="flex-1">
        <hr />
        <ViewField
          label="שם המתנדב"
          value={`${ride?.driver?.firstName} ${ride?.driver?.lastName}`}
        />
        <ViewField
          label="סוג רכב"
          value={
            ride?.driver?.carManufacturer
              ? `${ride?.driver?.carManufacturer} ${ride?.driver?.carModel}`
              : ''
          }
        />
        <ViewField label="לוחית זיהוי" value={ride?.driver?.carPlateNumber || ''} />

        <hr className="mt-2" />
        <ViewField label="כתובת איסוף" value={ride?.origin || ''} />
        <ViewField label="כתובת יעד" value={ride?.destination || ''} />

        <div className="mt-2">
          <p className=" text-sm text-gray-500">בקשות מיוחדות</p>
          <SpecialRequestsChips specialRequests={ride?.specialRequest || []} />
        </div>
      </div>

      <Button variant="outlined" href={`tel:${ride?.driver?.cellPhone}`}>
        <Phone />
        צור קשר עם המתנדב
      </Button>
    </div>
  );
};

export default withLayout(DriverArrived, {
  title: 'נסיעה פעילה',
  showLogoutButton: true
});
