import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../../components/LayoutHOC.tsx';
import { api } from '../../../../Config.ts';

const RideCompleted = () => {
  const navigate = useNavigate();

  const confirmComplete = async () => {
    await api.ride.postConfirmRideComplete();

    navigate('/driver/rides');
  };

  return (
    <div className="w-full overflow-auto">
      <h2 className="text-center text-blue-600">
        הגעתם ליעד
        <br />
        מודים לך על תרומתך!
      </h2>
      <Button variant="contained" color="primary" className="w-full" onClick={confirmComplete}>
        סיום נסיעה
      </Button>
    </div>
  );
};

export default withLayout(RideCompleted, {
  title: 'נסיעה פעילה',
  showLogoutButton: true
});
