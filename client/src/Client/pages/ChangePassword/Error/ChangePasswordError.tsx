import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../../components/LayoutHOC.tsx';

const ChangePasswordError = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-center items-center h-full">
        <p className="text-red-600 text-xl flex-grow text-center">
          שגיאה : נראה כי הלינק פג תוקף או שנעשה בו כבר שימוש
        </p>
      </div>
      <Button
        variant="contained"
        size="large"
        className="w-full"
        onClick={() => navigate('/forgot-password')}
      >
        חזרה לעמוד שכחתי סיסמה
      </Button>
    </div>
  );
};

export default withLayout(ChangePasswordError, {
  title: 'החלפת סיסמא',
  hideFooter: true,
  hideBackButton: true
});
