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
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <h1 className="text-center text-blue-600">
        הגעתם ליעד
        <br />
        מודים לך על תרומתך!
      </h1>
      <Button
        variant="contained"
        color="primary"
        className="w-full absolute bottom-2"
        onClick={confirmComplete}
      >
        סיום נסיעה
      </Button>
    </div>
  );
};

export default withLayout(RideCompleted, {
  title: 'נסיעה פעילה',
  showLogoutButton: true
});
