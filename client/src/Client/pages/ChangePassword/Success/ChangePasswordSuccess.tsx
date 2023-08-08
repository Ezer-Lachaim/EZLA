import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../../components/LayoutHOC.tsx';

const ChangePasswordSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-center items-center h-full">
        <p className="text-green-600 text-xl flex-grow text-center">הסיסמא הוחלפה בהצלחה</p>
      </div>
      <Button
        variant="contained"
        size="large"
        className="w-full"
        onClick={() => navigate('/login')}
      >
        חזרה לכניסה למערכת
      </Button>
    </div>
  );
};

export default withLayout(ChangePasswordSuccess, {
  title: 'החלפת סיסמא',
  hideFooter: true
});
