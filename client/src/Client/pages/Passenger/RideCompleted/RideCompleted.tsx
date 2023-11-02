import { Button } from '@mui/material';
import withLayout from '../../../components/LayoutHOC.tsx';
import { useApiContext } from '../../../../contexts/ApiContext';
import { useUserContext } from '../../../../contexts/UserContext.tsx';

const RideCompleted = () => {
  const api = useApiContext();
  const { reFetchActiveRide } = useUserContext();

  const confirmComplete = async () => {
    await api.ride.postConfirmRideComplete();
    await reFetchActiveRide();
    // navigation will occur automatically (in @../Passenger.tsx)
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <h1 className="text-center text-blue-600">
        הגעתם ליעד,
        <br />
        רפואה שלמה
        <br />
        🙏
      </h1>
      <Button
        variant="contained"
        color="primary"
        className="w-full absolute bottom-2"
        onClick={confirmComplete}
      >
        אישור נסיעה
      </Button>
    </div>
  );
};

export default withLayout(RideCompleted, {
  title: 'נסיעה פעילה',
  showLogoutButton: true
});
