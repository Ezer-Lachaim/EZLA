import { Button } from '@mui/material';
import withLayout from '../../../components/LayoutHOC.tsx';

const ChangePasswordSuccess = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-center items-center h-full">
        <p className="text-green-600 text-xl flex-grow text-center">הסיסמא הוחלפה בהצלחה</p>
      </div>
      <Button variant="contained" size="large" className="w-full">
        חזרה לכניסה למערכת
      </Button>
    </div>
  );
};

export default withLayout(ChangePasswordSuccess, {
  title: 'החלפת סיסמא',
  hideFooter: true,
  hideBackButton: true
});
