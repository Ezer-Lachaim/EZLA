import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../../components/LayoutHOC.tsx';
import { api, getGuestToken } from '../../../../Config.ts';

const RideCompleted = () => {
  const navigate = useNavigate();

  const confirmComplete = async () => {
    const guestToken = getGuestToken() || '';
    await api.ride.postConfirmRideComplete({ guestToken });

    navigate('/passenger/order-ride');
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
