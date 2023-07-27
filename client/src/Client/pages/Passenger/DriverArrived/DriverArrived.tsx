import { Phone, CheckCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import withLayout from '../../../components/LayoutHOC.tsx';
import { useUserContext } from '../../../../context/UserContext/UserContext.tsx';

const DriverArrived = () => {
  const { activeRide: ride } = useUserContext();

  return (
    <div className="w-full overflow-auto">
      <div className="bg-green-300 text-center rounded-md">
        <CheckCircle className="fill-green-600" />
        <p>ההסעה הגיע!</p>
      </div>
      <div>
        <hr />
        <b className="mt-4">שם המתנדב</b>
        <p>{`${ride?.driver?.firstName} ${ride?.driver?.lastName}`}</p>
        <b>סוג רכב</b>
        <p>
          {ride?.driver?.carManufacturer} {ride?.driver?.carModel}
        </p>
        <b>לוחית זיהוי</b>
        <p>{ride?.driver?.carPlateNumber}</p>
        <hr />
        <b>כתובת איסוף</b>
        <p>{ride?.origin}</p>
        <b>כתובת יעד</b>
        <p>{ride?.destination}</p>
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
