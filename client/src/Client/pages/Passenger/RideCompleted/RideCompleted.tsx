import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../../components/LayoutHOC.tsx';
import { api } from '../../../../Config.ts';

const RideCompleted = () => {
  const navigate = useNavigate();

  const confirmComplete = async () => {
    await api.ride.postConfirmRideComplete();

    navigate('/passenger/order-ride');
  };

  return (
    <div className="w-full overflow-auto">
      <h2 className="text-center text-blue-600">
        הגעתם ליעד
        <br />
        רפואה שלמה
      </h2>
      <Button variant="contained" color="primary" className="w-full" onClick={confirmComplete}>
        אישור נסיעה
      </Button>
    </div>
  );
};

export default withLayout(RideCompleted, {
  title: 'נסיעה פעילה',
  showLogoutButton: true
});
