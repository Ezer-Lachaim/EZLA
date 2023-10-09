import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import logo from '../../../assets/logo.png';
import withLayout from '../../components/LayoutHOC.tsx';

const FirstSignUp = () => {
  const navigation = useNavigate();

  return (
    <div className="flex flex-col items-center w-full">
      <img src={logo} alt="logo" className="mb-2.5" />
      <h1 className="text-center">
        שירות הסעות התנדבותי למבקרים בבתי חולים
        <b> ולכולם</b>
      </h1>
      <p className="text-center text-sm">
        מרכז &#39;עזר לחיים&#39; נוסד במטרה להקל ולהוריד מסבלם של החולים ובני משפחתם מתוך ידיעה
        ברורה שהעזרה והסיוע מצילים ומוסיפים חיים ונותנים כוח לחולה להתמודד בדרך לבריאות.
      </p>
      <p className="text-center text-md font-bold">לאור המצב פתחנו את השירות לכל מי שזקוק להסעה.</p>
      <Button
        variant="contained"
        color="secondary"
        className="w-full mb-6 mt-10"
        size="large"
        endIcon={<FaceIcon />}
        onClick={() => {
          navigation('/register');
        }}
      >
        הרשמה לשירות ההסעות
      </Button>
      <Button
        variant="contained"
        className="w-full mb-5"
        size="large"
        disabled
        endIcon={<CarIcon />}
      >
        כניסה ראשונה כמתנדב
      </Button>
      <p className="text-xs text-center">
        מחפשים להצטרף לשירותנו כמתנדבים?💪❤️ <br />
        למילוי טופס הרשמה הקישו&nbsp;
        <a href="https://forms.gle/fRAY1H2HLyZrpZAR6">כאן</a>
        <br />
        או
        <br />
        התקשרו לשירות הלקוחות 033-730440
      </p>

      <div className="flex gap-2 absolute bottom-4">
        <p>משתמש רשום,</p>
        <Link to="/login">כניסה למערכת</Link>
      </div>
    </div>
  );
};

export default withLayout(FirstSignUp, { hideNavbar: true });
